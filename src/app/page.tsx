import { DarkmodeToggle } from "@/components/common/darkmode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div className="bg-muted flex flex-col h-screen justify-center items-center space-y-4">
      <h1 className="text-4xl font-semibold">Welcome Adhitya Ramadhan Putra</h1>
      <Link href="/admin">
        <Button className="bg-teal-500 text-white">Access to Dashboard</Button>
      </Link>
    </div>
  );
}
