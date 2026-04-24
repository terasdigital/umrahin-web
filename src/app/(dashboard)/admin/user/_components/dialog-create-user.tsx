import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  INITIAL_CREATE_USER_FORM,
  INITIAL_STATE_CREATE_USER,
  ROLE_LIST,
} from "@/constants/auth-constant";
import { UserForm, userSchemaForm } from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { startTransition, useActionState, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createUser } from "../actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormImage from "@/components/common/form-image";
import { Preview } from "@/types/general";
import FormUser from "./form-user";

export default function DialogCreateUser({ refetch }: { refetch: () => void }) {
  const form = useForm<UserForm>({
    resolver: zodResolver(userSchemaForm),
    defaultValues: INITIAL_CREATE_USER_FORM,
  });

  // useActionState di gunakan untuk mengelola state dari proses login, termasuk status dan error yang mungkin terjadi selama proses tersebut.
  const [createUserState, createUserAction, isPendingCreateUser] =
    useActionState(createUser, INITIAL_STATE_CREATE_USER);

  const [preview, setPreview] = useState<Preview | undefined>(undefined);

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(
        key,
        key === "avatar_url" ? (preview?.file ?? "") : value,
      );
    });

    startTransition(() => {
      createUserAction(formData);
    });
  });

  useEffect(() => {
    if (createUserState?.status === "error") {
      toast.error("Create User Failed", {
        description: createUserState.errors?._form?.[0],
      });
      // startTransition(() => {
      //   createUserAction(null);
      // });
    }

    if (createUserState?.status === "success") {
      toast.success("Create User Success");
      form.reset();
      setPreview(undefined);
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [createUserState]);

  return (
    <FormUser
      form={form}
      onSubmit={onSubmit}
      isLoading={isPendingCreateUser}
      type="Create"
      preview={preview}
      setPreview={setPreview}
    />
  );
}
