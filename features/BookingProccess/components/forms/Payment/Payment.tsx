"use client"

import {FormProp} from "@/types/BookingProps"
import { CircleCheck } from 'lucide-react';
import Image from "next/image"
import CardNumber from "./inputs/CardNumber"
import ExpiryDate from "./inputs/ExpiryDate";
import SecurityNumber from "./inputs/SecurityNumber";
import UseDemoCard from "./inputs/UseDemoCard";
import { useTranslations } from "next-intl";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  FieldGroup,
} from "@/components/ui/field"

export default function Payment({ form }: FormProp) {
  const t = useTranslations("bookingProcess.payment");

  return (
        <AccordionItem value="payment" className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-5  px-4">
            <AccordionTrigger className="font-bold text-lg">{t("title")}</AccordionTrigger>
            <AccordionContent>
              <FieldGroup>
              <Image src={"/assets/visa.svg"} alt="visa" width={200} height={40} />  
              <div className="flex gap-3 items-center">
                <CircleCheck size={25} fill="#000" className="text-white"/>
                <div className="">
                    <p className="font-bold text-lg">{t("creditCard")}</p>
                    <p className="">{t("cardTypes")}</p>
                </div>
              </div>
                <CardNumber form={form}/>
                <div className="flex gap-5 ">
                    <ExpiryDate form={form}/>
                    <SecurityNumber form={form}/>
                </div>
                {/* demo data */}
                <UseDemoCard form={form}/>
              </FieldGroup>
            </AccordionContent>
        </AccordionItem>
  )
}