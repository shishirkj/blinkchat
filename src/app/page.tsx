import Sidebar from "@/components/shared/sidebar";
import { UserButton } from "@clerk/nextjs";
import { Card } from "@/components/shared/Card";

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/home" />
    <div className="h-screen flex">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500">
          <Card />
        </div>
      </div>
    </div>
    </div>
  );
}
