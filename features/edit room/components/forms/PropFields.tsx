import { FieldValues, Path, UseFormReturn } from "react-hook-form"
import {
  FieldGroup,
} from "@/components/ui/field"
import InputField from "@/components/shared/fields/InputField"
import type { RoomSharedFields } from "@/schema/AddRoomSchema"
import TextareaField from "@/components/shared/fields/TextareaField"
import SelectField from "@/components/shared/fields/SelectField"

interface PropFieldsProps<TFieldValues extends RoomSharedFields & FieldValues> {
  form: UseFormReturn<TFieldValues>
}

export default function PropFields<TFieldValues extends RoomSharedFields & FieldValues>({
  form,
}: PropFieldsProps<TFieldValues>) {
 
  const name = <K extends Path<RoomSharedFields>>(key: K) => key as unknown as Path<TFieldValues>

  return (
    <div>
      <FieldGroup>
        <div className="flex items-center gap-5">
            <div className="flex-2">
                <InputField form={form} label="title" name={name("title")} transilation="add edit room"/>
            </div>
            <div className="flex-1">
                <SelectField arr={["Studio", "Apartment", "Private Room"]} form={form} label="room type" name={name("roomType")} transilation="add edit room"/>
            </div>
        </div>
        <div className="flex items-center gap-5">
            <div className="flex-3">
                <InputField form={form} label="location" name={name("location")} transilation="add edit room"/>
            </div>
            <div className="flex-1">
                <InputField form={form} label="lat" name={name("lat")} transilation="add edit room"/>
            </div>
            <div className="flex-1">
                <InputField form={form} label="lng" name={name("lng")} transilation="add edit room"/>
            </div>
        </div>
        <TextareaField isEditing={true} form={form} label="description" name={name("description")} transilation="add edit room"/>
        <div className="flex gap-5 items-center">
            <InputField form={form} label="bedrooms" name={name("attrs.bedrooms")} transilation="add edit room"/>
            <InputField form={form} label="size" name={name("attrs.size")} transilation="add edit room"/>
            <InputField form={form} label="bathrooms" name={name("attrs.bathrooms")} transilation="add edit room"/>
        </div>
      </FieldGroup>
    </div>
  )
}