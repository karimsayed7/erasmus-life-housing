"use client"

import { useEffect } from "react"
import { FieldGroup } from "@/components/ui/field"
import InputField from "@/components/shared/fields/InputField"
import { AddRoomProp } from "@/schema/AddRoomSchema"

export default function PricesFields({ form }: AddRoomProp) {
  const price = form.watch("price")
  const fees = form.watch("fees")
  const bills = form.watch("bills")

  useEffect(() => {
    const total = (Number(price) || 0) + (Number(fees) || 0) + (Number(bills) || 0)
    form.setValue("total", total, { shouldValidate: true })
  }, [price, fees, bills, form])

  return (
    <div>
      <FieldGroup>
        <InputField form={form} label="price/per month" name="price" transilation="add edit room" />
        <InputField form={form} label="fees" name="fees" transilation="add edit room" />
        <InputField form={form} label="bills" name="bills" transilation="add edit room" />
        <InputField
          form={form}
          label="total"
          name="total"
          transilation="add edit room"
          isEditing={false}
        />
      </FieldGroup>
    </div>
  )
}