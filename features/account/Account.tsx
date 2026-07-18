"use client"

import { useEffect, useState } from 'react'
import PersonDetails from './components/PersonDetails'
import Header from '@/components/shared/Header/Header'
import BasicInfo from './components/forms/BasicInfo'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProfileSchema, ProfileFormType } from '@/schema/ProfileSchema'
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"
import { Button } from '@/components/ui/button'
import { useProfileDetails } from './hooks/UseProfileDetails'
import { splitName, joinName } from '@/lib/profile-name'
import { toast } from "sonner"
import { Profile } from '@/types/profile'
// import RequestMessage from './components/forms/RequestMessage'
import AdditionalDetails from './components/forms/AdditionalDetails'
import { useTranslations } from 'next-intl'


function profileToFormValues(profile: Profile): ProfileFormType {
  const { firstName, lastName } = splitName(profile.name)

  return {
    firstName,
    lastName,
    gender: (profile.gender as ProfileFormType["gender"]) ?? undefined,
    email: profile.email ?? "",
    phone_number: profile.phone_number ?? "",
    nationality: profile.nationality ?? "",
    current_address: profile.current_address ?? "",
    bookingRequestMessage: profile.booking_request_message ?? "",
    employment_status: (profile.employment_status as ProfileFormType["employment_status"]) ?? undefined,
    where_you_study: profile.where_you_study ?? "",
    funding_source: profile.funding_source ?? "",
    about_yourself: profile.about_yourself ?? "",
  }
}

export default function Account() {
  const { profile, setProfile } = useProfileDetails()
  const [isEditing, setIsEditing] = useState(false)
  const t = useTranslations('account.actions')
  const t2 = useTranslations('account.toast')

  const form = useForm<ProfileFormType>({
    resolver: zodResolver(ProfileSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: undefined,
      email: "",
      phone_number: "",
      nationality: "",
      current_address: "",
      bookingRequestMessage: "",
      employment_status: undefined,
      where_you_study: "",
      funding_source: "",
      about_yourself: "",
    },
  })

  useEffect(() => {
    if (!profile) return
    form.reset(profileToFormValues(profile))
  }, [profile, form])

  function handleEdit() {
    setIsEditing(true)
  }

  function handleCancel() {
    if (!profile) return
    form.reset(profileToFormValues(profile))
    setIsEditing(false)
  }

  async function onSubmit(data: ProfileFormType) {
    if (!profile) return

    const supabase = getSupabaseBrowserClient()
    const name = joinName(data.firstName ?? "", data.lastName ?? "")

    const { data: updated, error } = await supabase
      .from("profiles")
      .update({
        name,
        email: data.email ?? null,
        gender: data.gender ?? null,
        phone_number: data.phone_number ?? null,
        nationality: data.nationality ?? null,
        current_address: data.current_address ?? null,
        booking_request_message: data.bookingRequestMessage ?? null,
        employment_status: data.employment_status ?? null,
        where_you_study: data.where_you_study ?? null,
        funding_source: data.funding_source ?? null,
        about_yourself: data.about_yourself ?? null,
      })
      .eq("id", profile.id)
      .select()
      .single()

    if (error || !updated) {
      toast.error(t2("saveError"))
      return
    }

    setProfile(updated)
    form.reset(profileToFormValues(updated))
    setIsEditing(false)
    toast.success(t2("saveSuccess"))
  }


  return (
    <div>
      <Header />
      <div className='flex md:flex-row flex-col px-20 md:px-0 gap-20 justify-center py-20'>
        <div className="basis-[100%] md:basis-[10%]">
          <PersonDetails />
        </div>
        <div className="basis-[100%] md:basis-[42%] -mt-5">       
          <div className='text-end'>
            <Button
              type="button"
              onClick={handleEdit}
              className={`${isEditing ? "opacity-50" : "opacity-100"} cursor-pointer text-[16px] px-5 py-4`}
            >
              {t("edit")}
            </Button>
          </div>
          
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <BasicInfo form={form} isEditing={isEditing}/>
            {/* <RequestMessage form={form} isEditing={isEditing}/> */}
            <AdditionalDetails form={form} isEditing={isEditing}/>

            <div
              className={`flex gap-2 mt-4 ${
                isEditing ? "visible" : "invisible"
              }`}
            >
              <Button type="submit" disabled={form.formState.isSubmitting} className='cursor-pointer text-[16px] px-5 py-4'>
                {form.formState.isSubmitting ? `${t("saving")}...` : t("save")}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={form.formState.isSubmitting}
                className='cursor-pointer text-[16px] px-5 py-4'
              >
                {t("cancel")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}