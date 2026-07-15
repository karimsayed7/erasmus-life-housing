"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import type { AddRoomFormValues } from "@/schema/AddRoomSchema"
import { addRoomSchema } from "@/schema/AddRoomSchema"
import { X } from "lucide-react"
import Header from "@/components/shared/Header/Header"
import ImageUploadPreview from "./components/ImageUploadPreview"
import PricesFields from "./components/forms/PricesFields"
import { useTranslations } from "next-intl"
import PropFields from "./components/forms/PropFields"
import CheckboxesFields from "./components/forms/CheckboxesFields"
// import { useUploadImages } from "@/hooks/useUploadImages"
import { useUploadImages } from "./hook/UseUploadImagesResult "
// import { createRoom } from "./actions/createRoom"
import { createRoom } from "./actions"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"
import { toast } from "sonner"
import Link from "next/link"

export default function AddRoom() {
  const t = useTranslations("add edit room")
  const router = useRouter()
  const { uploadImages, uploading } = useUploadImages("rooms")
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<AddRoomFormValues>({
    resolver: zodResolver(addRoomSchema),
    defaultValues: {
      title: "",
      description: "",
      images: [],
      roomType: undefined,
      location: "",
      lat: 0,
      lng: 0,
      attrs: { bedrooms: 0, bathrooms: 0, size: 0 },
      price: 0,
      fees: 0,
      bills: 0,
      total: 0,
      facilities: [],
      landlordRules: [],
    },
  })
  function handleAutoFill() {
  form.reset({
    title: "Cozy Studio Near Downtown",
    description:
      "A bright and quiet studio, fully renovated, close to public transport and cafes. Perfect for students looking for a peaceful place to focus and relax.",
    images: [], // files can't be faked — you'll still need to upload manually
    roomType: "Studio",
    location: "R. Braancamp 14, 1250-050 Lisboa",
    lat: 38.7223,
    lng: -9.1393,
    attrs: { bedrooms: 1, bathrooms: 1, size: 22 },
    price: 650,
    fees: 50,
    bills: 40,
    total: 740,
    facilities: ["tv", "wifi", "central_heating", "elevator"],
    landlordRules: ["no_smoking"],
  })
}

  const images = form.watch("images") ?? []

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      const newFiles = Array.from(fileList)
      form.setValue("images", [...images, ...newFiles], { shouldValidate: true })
    },
    [images, form]
  )

  function handleRemove(index: number) {
    form.setValue("images", images.filter((_, i) => i !== index), { shouldValidate: true })
  }

  async function onSubmit(values: AddRoomFormValues) {
  setSubmitting(true)
  try {
    const supabase = getSupabaseBrowserClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      form.setError("root", { message: "You must be signed in to add a room" })
      return
    }

    const imageUrls = await uploadImages(values.images, user.id)

    if (imageUrls.length !== values.images.length) {
      form.setError("images", { message: "Some images failed to upload, please try again" })
      return
    }

    const result = await createRoom({ ...values, imageUrls })
    if (!result.success) {
      form.setError("root", { message: result.error })
      return
    }

    router.push("/admin/PropertyManagement")
    toast.success("room added successfully", { style: { minWidth: "360px" } });

  } finally {
    setSubmitting(false)
  }
}

  return (
    <div>
      <Header />
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-20 pt-4 mb-20">
        <div className="flex mb-5 items-center justify-between">
          <h1 className="mb-5 text-[26px] font-bold text-blue-900">{t("add room")}</h1>
          <Link href={"/admin/PropertyManagement"}>
            <X size={25} className="cursor-pointer text-gray-500" />
          </Link>
        </div>
        <div className="flex gap-15 w-full">
          <div className="w-[30%]">
            <div className="mb-52">
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
          <div className="w-[70%]">
            <PropFields form={form} />
            <CheckboxesFields form={form} />
          </div>
        </div>

        {form.formState.errors.root && (
          <p className="text-red-500 text-sm mt-4">{form.formState.errors.root.message}</p>
        )}

        <div className="w-full flex items-end justify-end gap-10 mt-10">
          {process.env.NODE_ENV === "development" && (
            <button
              type="button"
              onClick={handleAutoFill}
              className="text-[17px] cursor-pointer text-gray-600 underline hover:text-blue-900"
            >
              Auto-fill test data
            </button>
          )}

          <button
            type="submit"
            disabled={submitting || uploading}
            className="bg-blue-900 text-white cursor-pointer hover:shadow-xl px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {submitting || uploading ? "..." : t("add room")}
          </button>
        </div>
      </form>
    </div>
  )
}