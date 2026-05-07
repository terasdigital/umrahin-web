import { zodResolver } from "@hookform/resolvers/zod";

import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createMenu } from "../actions";
import { Preview } from "@/types/general";
import FormMenu from "./form-menu";
import { INITIAL_MENU, INITIAL_STATE_MENU } from "@/constants/menu-constant";
import { MenuForm, menuSchemaForm } from "@/validations/menu-validation";

export default function DialogCreateMenu({ refetch }: { refetch: () => void }) {
  const form = useForm<MenuForm>({
    resolver: zodResolver(menuSchemaForm),
    defaultValues: INITIAL_MENU,
  });

  // useActionState di gunakan untuk mengelola state dari proses login, termasuk status dan error yang mungkin terjadi selama proses tersebut.
  const [createMenuState, createMenuAction, isPendingCreateMenu] =
    useActionState(createMenu, INITIAL_STATE_MENU);

  const [preview, setPreview] = useState<Preview | undefined>(undefined);

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, key === "image_url" ? (preview?.file ?? "") : value);
    });

    startTransition(() => {
      createMenuAction(formData);
    });
  });

  useEffect(() => {
    if (createMenuState?.status === "error") {
      toast.error("Create Menu Failed", {
        description: createMenuState.errors?._form?.[0],
      });
      // startTransition(() => {
      //   createMenuAction(null);
      // });
    }

    if (createMenuState?.status === "success") {
      toast.success("Create Menu Success");
      form.reset();
      setPreview(undefined);
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [createMenuState]);

  return (
    <FormMenu
      form={form}
      onSubmit={onSubmit}
      isLoading={isPendingCreateMenu}
      type="Create"
      preview={preview}
      setPreview={setPreview}
    />
  );
}
