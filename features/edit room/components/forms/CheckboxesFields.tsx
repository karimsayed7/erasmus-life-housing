import { FieldValues, Path, UseFormReturn } from "react-hook-form"
import CheckboxGroupField from "@/components/shared/fields/CheckboxGroupField"
import { FACILITIES_OPTIONS, LANDLORD_RULES_OPTIONS } from "@/lib/constants/roomOptions"
import type { RoomSharedFields } from "@/schema/AddRoomSchema"

interface CheckboxesFieldsProps<TFieldValues extends RoomSharedFields & FieldValues> {
  form: UseFormReturn<TFieldValues>
}

export default function CheckboxesFields<TFieldValues extends RoomSharedFields & FieldValues>({
  form,
}: CheckboxesFieldsProps<TFieldValues>) {
  const name = <K extends Path<RoomSharedFields>>(key: K) => key as unknown as Path<TFieldValues>

  return (
    <div className="mt-8 space-y-8">
      <CheckboxGroupField
        form={form}
        name={name("facilities")}
        label="facilities"
        transilation="add edit room"
        options={FACILITIES_OPTIONS}
        variant="grid"
      />
      <CheckboxGroupField
        form={form}
        name={name("landlordRules")}
        label="landlordRules"
        transilation="add edit room"
        options={LANDLORD_RULES_OPTIONS}
        variant="pills"
      />
    </div>
  )
}