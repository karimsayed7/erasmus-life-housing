"use client"

import {FormProp} from "@/types/BookingProps"
import Name_Surname from "./components/Name_Surname"
import Email from "./components/Email"
import Phone from "./components/Phone"
import RadioAloneQ from "./components/RadioAloneQ"
import RadioOccupatioeQ from "./components/RadioOccupatioeQ"
import University from "./components/University"
import AboutYou from "./components/AboutYou"
import { useTranslations } from "next-intl"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  FieldGroup,
} from "@/components/ui/field"

export default function ContactInfos({ form }: FormProp) {
  const t = useTranslations("bookingProcess.contactInfo");

  return (
        <AccordionItem value="contact" className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-5  px-4">
            <AccordionTrigger className="font-bold text-lg">{t("title")}</AccordionTrigger>
            <AccordionContent>
              <FieldGroup>
                <div  className="flex gap-5">
                  <Name_Surname form={form}/>
                </div>
                <Email form={form}/>
                <Phone form={form}/>
                <h3 className="font-bold text-lg">{t("sectionTitle")}</h3>
                <RadioAloneQ form={form}/>
                <RadioOccupatioeQ form={form}/>
                <University form={form}/>
                <AboutYou form={form}/>
              </FieldGroup>
            </AccordionContent>
        </AccordionItem>
  )
}