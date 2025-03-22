import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from './theme-provider';
import { Button } from './ui/button';

const ToggleTheme = () => {
    const {theme, setTheme} = useTheme();

  return (
    <>
    {theme === "dark" ? 
    <Button onClick={()=>setTheme("light")} 
    variant="ghost" 
    size="icon" 
    className="relative cursor-pointer rounded-full w-6 h-6">
        <SunIcon className="w-4 h-4" />
    </Button> :
    <Button onClick={()=>setTheme("dark")}
    variant="ghost" 
    size="icon" 
    className="relative cursor-pointer rounded-full w-6 h-6">
        <MoonIcon className="w-4 h-4" />
    </Button>}
    </>
  )
}

export default ToggleTheme