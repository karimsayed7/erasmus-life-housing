"use client"

import {FormProp} from "@/types/BookingProps"
import RadioAloneQ from "./radio_inputs/RadioAloneQ"
import RadioOccupatioeQ from "./radio_inputs/RadioOccupatioeQ"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useTranslations } from "next-intl"
import {
  FieldGroup,
} from "@/components/ui/field"
import InputField from "@/components/shared/fields/InputField"
import SelectField from "@/components/shared/fields/SelectField"
import TextareaField from "@/components/shared/fields/TextareaField"

export default function ContactInfos({ form }: FormProp) {
  const t = useTranslations("bookingProcess.contactInfo");

  return (
        <AccordionItem value="contact" className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-5  px-4">
            <AccordionTrigger className="font-bold text-lg">{t("title")}</AccordionTrigger>
            <AccordionContent>
              <FieldGroup>
                <div  className="flex gap-5">
                  <InputField form={form} label="name" name="name" transilation="bookingProcess.contactInfo"/>
                  <InputField form={form} label="surname" name="surname" transilation="bookingProcess.contactInfo"/>
                </div>
                <InputField form={form} label="email" name="email" transilation="bookingProcess.contactInfo"/>
                <InputField form={form} label="phone" name="phone" transilation="bookingProcess.contactInfo"/>
                <h3 className="font-bold text-lg">{t("sectionTitle")}</h3>
                <RadioAloneQ form={form}/>
                <RadioOccupatioeQ form={form}/>
                <SelectField form={form} label="universityQuestion" name="university" transilation="bookingProcess.contactInfo" arr={["university-of-lisbon","nova-university-lisbon", "university-of-porto" , "porto-polytechnic"]}/>
                <div className="mb-4">
                  <TextareaField form={form} label="aboutYou" name="about" transilation="bookingProcess.contactInfo"/>
                </div>
              </FieldGroup>
            </AccordionContent>
        </AccordionItem>
  )
}