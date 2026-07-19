import { FieldValues, Path, UseFormReturn } from "react-hook-form"
import CheckboxGroupField from "@/components/shared/fields/CheckboxGroupField"
import { FACILITIES_OPTIONS, LANDLORD_RULES_OPTIONS } from "@/lib/constants/roomOptions"
import type { RoomSharedFields } from "@/schema/AddRoomSchema"

interface CheckboxesFieldsProps {
  form: UseFormReturn<any>
}

export default function CheckboxesFields({
  form,
}: CheckboxesFieldsProps) {
  const name = (key: string) => key as any

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