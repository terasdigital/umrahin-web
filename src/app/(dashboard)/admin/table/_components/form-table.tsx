import FormInput from "@/components/common/form-input";
import FormSelect from "@/components/common/form-select";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { STATUS_TABLE_LIST } from "@/constants/table-constant";
import { Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export default function FormTable<T extends FieldValues>({
  form,
  onSubmit,
  isLoading,
  type,
}: {
  form: UseFormReturn<T>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  type: "Create" | "Update";
}) {
  return (
    <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
      <DialogHeader>
        <DialogTitle>{type} Table</DialogTitle>
        <DialogDescription>
          {type === "Create" ? "Add a new table" : "Make changes table here"}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-4 max-h-[50vh] overflow-y-auto">
          <FormInput
            form={form}
            name={"name" as Path<T>}
            label="Name"
            placeholder="Insert Table Name"
          />
          <FormInput
            form={form}
            name={"description" as Path<T>}
            label="Description"
            placeholder="Insert Table Description"
            type="textarea"
          />
          <FormInput
            form={form}
            name={"capacity" as Path<T>}
            label="Capacity"
            placeholder="Insert Table Capacity"
            type="number"
          />
          <FormSelect
            form={form}
            name={"status" as Path<T>}
            label="Status"
            placeholder="Select Status"
            selectItem={STATUS_TABLE_LIST}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isLoading ? <Loader2 className="animate-spin" /> : type}
            </Button>
          </DialogFooter>
        </div>
      </form>
    </DialogContent>
  );
}
