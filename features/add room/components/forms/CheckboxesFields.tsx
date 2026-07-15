import CheckboxGroupField from "@/components/shared/fields/CheckboxGroupField"
import { FACILITIES_OPTIONS, LANDLORD_RULES_OPTIONS } from "@/lib/constants/roomOptions"
import type { AddRoomProp } from "@/schema/AddRoomSchema"

export default function CheckboxesFields({ form }: AddRoomProp) {
  return (
    <div className="mt-8 space-y-8">
      <CheckboxGroupField
        form={form}
        name="facilities"
        label="facilities"
        transilation="add edit room"
        options={FACILITIES_OPTIONS}
        variant="grid"
      />
      <CheckboxGroupField
        form={form}
        name="landlordRules"
        label="landlordRules"
        transilation="add edit room"
        options={LANDLORD_RULES_OPTIONS}
        variant="pills"
      />
    </div>
  )
}