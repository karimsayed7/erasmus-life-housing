"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { editRoomSchema, type EditRoomFormValues } from "@/schema/EditRoomSchema"
import { X } from "lucide-react"
import Header from "@/components/shared/Header/Header"
import ImageUploadPreview from "@/components/shared/ImageUploadPreview"
import PricesFields from "@/features/add room/components/forms/PricesFields"
import { useTranslations } from "next-intl"
import PropFields from "@/features/add room/components/forms/PropFields"
import CheckboxesFields from "@/features/add room/components/forms/CheckboxesFields"
import { useUploadImages } from "@/features/add room/hook/UseUploadImagesResult "
import { updateRoom } from "./actions"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"
import { toast } from "sonner"
import Link from "next/link"
import type { RoomForEdit } from "./server/getRoomById"

interface EditRoomProps {
  room: RoomForEdit
}

export default function EditRoom({ room }: EditRoomProps) {
  const t = useTranslations("add edit room")
  const router = useRouter()
  const { uploadImages, uploading } = useUploadImages("rooms")
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<EditRoomFormValues>({
    resolver: zodResolver(editRoomSchema),
    // Hydrated straight from the fetched room — images start as the existing
    // public URLs (strings), everything else maps 1:1 onto the same shape
    // AddRoom uses so PropFields/PricesFields/CheckboxesFields need zero changes.
    defaultValues: {
      title: room.title.en,
      description: room.description.en,
      images: room.images,
      roomType: room.roomType,
      location: room.location.en,
      lat: room.lat,
      lng: room.lng,
      attrs: room.attrs,
      price: room.price,
      fees: room.fees,
      bills: room.bills,
      total: room.total,
      facilities: room.facilities,
      landlordRules: room.landlordRules,
    },
  })

  const images = form.watch("images") ?? []

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      const newFiles = Array.from(fileList)
      form.setValue("images", [...images, ...newFiles], { shouldValidate: true })
    },
    [images, form]
  )

  function handleRemove(index: number) {
    form.setValue(
      "images",
      images.filter((_, i) => i !== index),
      { shouldValidate: true }
    )
  }

  async function onSubmit(values: EditRoomFormValues) {
    setSubmitting(true)
    try {
      const supabase = getSupabaseBrowserClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        form.setError("root", { message: "You must be signed in to edit a room" })
        return
      }

      // Split the mixed images array: existing URLs pass through untouched,
      // new Files still need to be uploaded to Storage first. Order is
      // preserved so the gallery order the admin arranged stays intact.
      const newFiles = values.images.filter((img): img is File => img instanceof File)
      const uploadedUrls = newFiles.length ? await uploadImages(newFiles, user.id) : []

      if (uploadedUrls.length !== newFiles.length) {
        form.setError("images", { message: "Some images failed to upload, please try again" })
        return
      }

      let uploadedIndex = 0
      const imageUrls = values.images.map((img) => (img instanceof File ? uploadedUrls[uploadedIndex++] : img))

      const result = await updateRoom({ ...values, imageUrls, roomId: room.id })
      if (!result.success) {
        form.setError("root", { message: result.error })
        return
      }

      router.push("/admin/PropertyManagement")
      toast.success("room updated successfully", { style: { minWidth: "360px" } })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <Header />
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-5 lg:px-20 pt-4 mb-20">
        <div className="flex mb-5 items-center justify-between">
          <h1 className="mb-5 text-[26px] font-bold text-blue-900">{t("edit room")}</h1>
          <Link href={"/admin/PropertyManagement"}>
            <X size={25} className="cursor-pointer text-gray-500" />
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-15 w-full">
          <div className="w-full md:w-[30%]">
            <div className="mb-30 md:mb-52">
              <p className="mb-2 text-[16px]">{t("upload photo")}</p>
              <ImageUploadPreview images={images} onAddFiles={addFiles} onRemove={handleRemove} />
              {form.formState.errors.images && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.images.message}</p>
              )}
            </div>
            <div>
              <PricesFields form={form} />
            </div>
          </div>
          <div className="w-full md:w-[70%]">
            <PropFields form={form} />
            <CheckboxesFields form={form} />
          </div>
        </div>

        {form.formState.errors.root && (
          <p className="text-red-500 text-sm mt-4">{form.formState.errors.root.message}</p>
        )}

        <div className="w-full flex items-end justify-end gap-10 mt-10">
          <button
            type="submit"
            disabled={submitting || uploading}
            className="bg-blue-900 text-white cursor-pointer hover:shadow-xl px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {submitting || uploading ? "..." : t("save changes")}
          </button>
        </div>
      </form>
    </div>
  )
}