import DialogDelete from "@/components/common/dialog-delete";
import { Profile } from "@/types/auth";
import { deleteMenu } from "../actions";
import { startTransition, useActionState, useEffect } from "react";
import { INITIAL_STATE_ACTION } from "@/constants/general-constant";
import { toast } from "sonner";
import { Menu } from "@/validations/menu-validation";
import { INITIAL_STATE_MENU } from "@/constants/menu-constant";

export default function DialogDeleteMenu({
  open,
  refetch,
  currentData,
  handleChangeAction,
}: {
  refetch: () => void;
  currentData?: Menu;
  open: boolean;
  handleChangeAction: (open: boolean) => void;
}) {
  const [deleteMenuState, deleteMenuAction, isPendingDeleteMenu] =
    useActionState(deleteMenu, INITIAL_STATE_MENU);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("id", currentData!.id as string);
    formData.append("image_url", currentData!.image_url as string);
    startTransition(() => {
      deleteMenuAction(formData);
    });
  };

  useEffect(() => {
    if (deleteMenuState?.status === "error") {
      toast.error("Delete Menu Failed", {
        description: deleteMenuState.errors?._form?.[0],
      });
      // startTransition(() => {
      //   deleteMenuAction(null);
      // });
    }

    if (deleteMenuState?.status === "success") {
      toast.success("Delete Menu Success");
      handleChangeAction?.(false);
      refetch();
    }
  }, [deleteMenuState]);
  return (
    <DialogDelete
      open={open}
      onOpenChange={handleChangeAction}
      onSubmit={onSubmit}
      isLoading={isPendingDeleteMenu}
      title="Menu"
    />
  );
}
