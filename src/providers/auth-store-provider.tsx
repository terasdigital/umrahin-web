"use client";

import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";
import { Profile } from "@/types/auth";
import { ReactNode, useEffect, useRef } from "react";

export default function AuthStoreProvider({
  children,
  profile,
}: {
  children: ReactNode;
  profile: Profile;
}) {
  // const storeRef = useRef(false);
  // if (!storeRef.current) {
  //   useAuthStore.setState({ profile });
  //   storeRef.current = true;
  // }

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      useAuthStore.getState().setUser(user);
      useAuthStore.getState().setProfile(profile);
    });
  }, []);

  return <>{children}</>;
}
