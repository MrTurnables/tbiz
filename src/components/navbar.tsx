import { SidebarTrigger } from "./ui/sidebar"
import { UserButton } from "./user-button";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center h-12 dark:bg-gray-800 bg-white shadow-sm pr-2 cursor-pointer">
        <SidebarTrigger className="cursor-pointer" />

        <UserButton />
    </nav>
  )
}

export default Navbar