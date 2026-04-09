import { DarkmodeToggle } from "@/components/common/darkmode-toggle";
import { TreePalm } from "lucide-react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative bg-muted min-h-svh flex flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="absolute top-4 right-4">
        <DarkmodeToggle />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div className="bg-teal-400 flex items-center justify-center p-2 rounded">
            <TreePalm />
          </div>
          UmrahIn
        </div>
        {children}
      </div>
    </div>
  );
}
