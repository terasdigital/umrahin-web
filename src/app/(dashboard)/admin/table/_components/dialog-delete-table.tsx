import DialogDelete from "@/components/common/dialog-delete";
import { deleteTable } from "../actions";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Table } from "@/validations/table-validation";
import { INITIAL_STATE_TABLE } from "@/constants/table-constant";

export default function DialogDeleteTable({
  open,
  refetch,
  currentData,
  handleChangeAction,
}: {
  refetch: () => void;
  currentData?: Table;
  open: boolean;
  handleChangeAction: (open: boolean) => void;
}) {
  const [deleteTableState, deleteTableAction, isPendingDeleteTable] =
    useActionState(deleteTable, INITIAL_STATE_TABLE);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("id", currentData!.id as string);
    startTransition(() => {
      deleteTableAction(formData);
    });
  };

  useEffect(() => {
    if (deleteTableState?.status === "error") {
      toast.error("Delete Table Failed", {
        description: deleteTableState.errors?._form?.[0],
      });
      // startTransition(() => {
      //   deleteMenuAction(null);
      // });
    }

    if (deleteTableState?.status === "success") {
      toast.success("Delete Table Success");
      handleChangeAction?.(false);
      refetch();
    }
  }, [deleteTableState]);
  return (
    <DialogDelete
      open={open}
      onOpenChange={handleChangeAction}
      onSubmit={onSubmit}
      isLoading={isPendingDeleteTable}
      title="Table"
    />
  );
}
