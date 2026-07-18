"use client"

import { useEffect } from "react"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"
import { FieldGroup } from "@/components/ui/field"
import InputField from "@/components/shared/fields/InputField"
import type { RoomSharedFields } from "@/schema/AddRoomSchema"

interface PricesFieldsProps<TFieldValues extends RoomSharedFields & FieldValues> {
  form: UseFormReturn<TFieldValues>
}

export default function PricesFields<TFieldValues extends RoomSharedFields & FieldValues>({
  form,
}: PricesFieldsProps<TFieldValues>) {
  const name = <K extends Path<RoomSharedFields>>(key: K) => key as unknown as Path<TFieldValues>

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
        <InputField form={form} label="price/per month" name={name("price")} transilation="add edit room" />
        <InputField form={form} label="fees" name={name("fees")} transilation="add edit room" />
        <InputField form={form} label="bills" name={name("bills")} transilation="add edit room" />
        <InputField
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