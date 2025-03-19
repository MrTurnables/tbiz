import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar"
import { UserButton } from "./user-button";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center h-12 dark:bg-gray-800 bg-white shadow-sm pr-2 cursor-pointer">
        <SidebarTrigger className="cursor-pointer" />

        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" size="icon" className="relative cursor-pointer rounded-full w-6 h-6">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 right-0 text-xs text-red-800">0</span>
          </Button>
          <UserButton />
        </div>
    </nav>
  )
}

export default Navbar