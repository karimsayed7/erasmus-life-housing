"use client"

import { useEffect } from "react"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"
import { FieldGroup } from "@/components/ui/field"
import InputField from "@/components/shared/fields/InputField"
import type { RoomSharedFields } from "@/schema/AddRoomSchema"

interface PricesFieldsProps {
  form: UseFormReturn<any>
}

export default function PricesFields({
  form,
}: PricesFieldsProps) {
  const name = (key: string) => key as any

  const price = form.watch(name("price"))
  const fees = form.watch(name("fees"))
  const bills = form.watch(name("bills"))

  useEffect(() => {
    const total = (Number(price) || 0) + (Number(fees) || 0) + (Number(bills) || 0)
    form.setValue(name("total"), total as never, { shouldValidate: true })
  }, [price, fees, bills, form])

  return (
    <div>
      <FieldGroup>
        <InputField type="number" form={form} label="price/per month" name={name("price")} transilation="add edit room" />
        <InputField type="number" form={form} label="fees" name={name("fees")} transilation="add edit room" />
        <InputField type="number" form={form} label="bills" name={name("bills")} transilation="add edit room" />
        <InputField
          type="number"
          form={form}
          label="total"
          name={name("total")}
          transilation="add edit room"
          isEditing={false}
        />
      </FieldGroup>
    </div>
  )
}