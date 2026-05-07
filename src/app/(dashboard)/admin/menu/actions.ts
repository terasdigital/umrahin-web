"use server";

import { deleteFile, uploadFile } from "@/actions/storage-action";
import { createClient } from "@/lib/supabase/server";
import { MenuFormState } from "@/types/menu";
import { menuSchema } from "@/validations/menu-validation";

export async function createMenu(prevState: MenuFormState, formData: FormData) {
  const validateFields = menuSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price") as string),
    discount: parseFloat(formData.get("discount") as string),
    category: formData.get("category"),
    is_available: formData.get("is_available") === "true" ? true : false,
    image_url: formData.get("image_url"),
  });

  if (!validateFields.success) {
    return {
      status: "error",
      errors: {
        ...validateFields.error.flatten().fieldErrors,
        _form: [],
      },
    };
  }

  let ImageUrl: string | undefined;

  if (validateFields.data.image_url instanceof File) {
    const { errors, data } = await uploadFile(
      "images",
      "menus",
      validateFields.data.image_url,
    );

    if (errors) {
      return {
        status: "error",
        errors: {
          ...prevState.errors,
          _form: [...errors._form],
        },
      };
    }

    ImageUrl = data?.url;
  }

  const supabase = await createClient();

  const { error } = await supabase.from("menus").insert({
    name: validateFields.data.name,
    description: validateFields.data.description,
    price: validateFields.data.price,
    discount: validateFields.data.discount,
    category: validateFields.data.category,
    is_available: validateFields.data.is_available,
    image_url: ImageUrl,
  });

  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  return {
    status: "success",
  };
}

export async function updateMenu(prevState: MenuFormState, formData: FormData) {
  const validateFields = menuSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price") as string),
    discount: parseFloat(formData.get("discount") as string),
    category: formData.get("category"),
    is_available: formData.get("is_available") === "true" ? true : false,
    image_url: formData.get("image_url"),
  });

  if (!validateFields.success) {
    return {
      status: "error",
      errors: {
        ...validateFields.error.flatten().fieldErrors,
        _form: [],
      },
    };
  }

  let ImageUrl: string | undefined;

  if (validateFields.data.image_url instanceof File) {
    const oldImageUrl = formData.get("old_image_url") as string;
    const { errors, data } = await uploadFile(
      "images",
      "menus",
      validateFields.data.image_url,
      oldImageUrl.split("/images/")[1],
    );

    if (errors) {
      return {
        status: "error",
        errors: {
          ...prevState.errors,
          _form: [...errors._form],
        },
      };
    }

    ImageUrl = data?.url;
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("menus")
    .update({
      name: validateFields.data.name,
      description: validateFields.data.description,
      price: validateFields.data.price,
      discount: validateFields.data.discount,
      category: validateFields.data.category,
      is_available: validateFields.data.is_available,
      image_url: ImageUrl,
    })
    .eq("id", formData.get("id"));

  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  return {
    status: "success",
  };
}

export async function deleteMenu(prevState: MenuFormState, formData: FormData) {
  const supabase = await createClient();
  const image = formData.get("image_url") as string;
  const { status, errors } = await deleteFile(
    "images",
    image.split("/images/")[1],
  );

  if (status === "error") {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [...(errors?._form?.[0] ?? "Unknown error")],
      },
    };
  }

  const { error } = await supabase
    .from("menus")
    .delete()
    .eq("id", formData.get("id"));

  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }
  return {
    status: "success",
  };
}
