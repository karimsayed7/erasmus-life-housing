"use client"

import { useEffect, useMemo, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import { X, Upload, Plus } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"

import "swiper/css"
import "swiper/css/navigation"

// String = existing uploaded image (already a public URL, e.g. edit mode)
// File   = a newly picked file that hasn't been uploaded yet
type ImageItem = File | string

interface Props {
  images: ImageItem[]
  onAddFiles: (files: FileList | File[]) => void
  onRemove: (index: number) => void
}

function isFile(item: ImageItem): item is File {
  return item instanceof File
}

export default function ImageUploadPreview({ images, onAddFiles, onRemove }: Props) {
  const t = useTranslations("add edit room")
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Only File items need an object URL — string items are already a usable src.
  const previews = useMemo(
    () => images.map((item) => (isFile(item) ? URL.createObjectURL(item) : item)),
    [images]
  )

  useEffect(() => {
    return () => {
      images.forEach((item, i) => {
        if (isFile(item)) URL.revokeObjectURL(previews[i])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previews])

  useEffect(() => {
    if (swiper) {
      swiper.update()
    }
  }, [images.length, swiper])

  const safeActiveIndex = Math.min(activeIndex, Math.max(images.length - 1, 0))

  function handleRemove(e: React.MouseEvent, index: number) {
    e.stopPropagation()
    onRemove(index)

    if (index <= safeActiveIndex) {
      const newIndex = Math.max(safeActiveIndex - 1, 0)
      setActiveIndex(newIndex)
      swiper?.slideTo(newIndex)
    }
  }

  function handleDrop(e: React.DragEvent<HTMLElement>) {
    e.preventDefault()
    if (e.dataTransfer.files?.length) onAddFiles(e.dataTransfer.files)
  }

  function handleDragOver(e: React.DragEvent<HTMLElement>) {
    e.preventDefault()
  }

  if (!images.length) {
    return (
      <label
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center border-2 border-dashed h-55 cursor-pointer rounded-xl overflow-hidden hover:bg-gray-50 transition-colors"
      >
        <Upload size={25} />
        <p className="my-2">{t("drag & drop")}</p>
        <p className="text-gray-400 text-md mb-3">or</p>
        <p className="font-semibold text-blue-900">{t("browse files")}</p>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && onAddFiles(e.target.files)}
        />
      </label>
    )
  }

  return (
    <div className="w-full">
      <Swiper
        observer
        observeParents
        modules={[Navigation]}
        navigation
        onSwiper={setSwiper}
        onSlideChange={(s) => setActiveIndex(s.activeIndex)}
        className="mb-4 rounded-xl overflow-hidden h-55"
      >
        {previews.map((src, index) => (
          <SwiperSlide key={src}>
            <div className="relative w-full h-full overflow-hidden">
              <Image src={src} alt={`Room image ${index + 1}`} fill className="object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex gap-2 flex-wrap">
        {previews.map((src, index) => (
          <div
            key={src}
            className={`
              relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg border-3 cursor-pointer transition-all
              ${safeActiveIndex === index ? "border-blue-600" : "border-transparent"}
            `}
            onClick={() => {
              swiper?.slideTo(index)
              setActiveIndex(index)
            }}
          >
            <Image src={src} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
            <button
              type="button"
              onClick={(e) => handleRemove(e, index)}
              className="absolute top-0.5 right-0.5 bg-black/60 hover:bg-black/80 rounded-full p-0.5 z-10"
            >
              <X size={12} className="text-white" />
            </button>
          </div>
        ))}

        <label
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="relative aspect-square w-16 shrink-0 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <Plus size={20} className="text-gray-400" />
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && onAddFiles(e.target.files)}
          />
        </label>
      </div>
    </div>
  )
}