import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { FileImage } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { getImageData } from "@/lib/utils";
import { Preview } from "@/types/general";

export default function FormImage<T extends FieldValues>({
  form,
  name,
  label,
  preview,
  setPreview,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  preview?: Preview;
  setPreview?: (preview: Preview) => void;
}) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const { value, ...restField } = field;
        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{label}</FieldLabel>
            <div className="flex gap-2">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={preview?.displayUrl}
                  alt="preview"
                  className="object-cover"
                />
                <AvatarFallback className="rounded-lg">
                  <FileImage className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <Input
                {...restField}
                id={name}
                type="file"
                onChange={async (event) => {
                  field.onChange(event);
                  const { file, displayUrl } = getImageData(event);
                  if (file) {
                    setPreview?.({
                      file,
                      displayUrl,
                    });
                  }
                }}
              />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </div>
          </Field>
        );
      }}
    />
  );
}
