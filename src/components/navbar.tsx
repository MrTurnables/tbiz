import { MoonIcon, SunIcon } from "lucide-react"
import { Button } from "./ui/button"
import { SidebarTrigger } from "./ui/sidebar"
import { useTheme } from "./theme-provider";

const Navbar = () => {
  const {theme, setTheme} = useTheme();

  const toggleThemeButton = {
    light: <Button 
        onClick={() => setTheme("dark")}
        variant="ghost"
        size="icon" 
        className="flex flex-col items-center justify-center w-4 h-4 cursor-pointer">
          <MoonIcon />
        </Button>,
    dark: <Button 
        onClick={() => setTheme("light")}
        variant="ghost"
        size="icon" 
        className="flex flex-col items-center justify-center w-4 h-4 cursor-pointer">
          <SunIcon />
        </Button>,
  }
  
  return (
    <nav className="w-full flex justify-between items-center h-12 dark:bg-gray-800 bg-white shadow-sm pr-2 cursor-pointer">
        <SidebarTrigger className="cursor-pointer" />

        {theme === "dark" ? toggleThemeButton.dark : toggleThemeButton.light}
    </nav>
  )
}

export default Navbar