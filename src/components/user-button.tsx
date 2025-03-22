import { LogOutIcon } from "lucide-react";
import { useState } from "react";
import useUser from "~/hooks/use-user";

export function UserButton() {
    const {user, setUser} = useUser(state=>state);
    const [open, setOpen] = useState(false);
    
  return (
    <div
    tabIndex={-1}
    onBlur={()=>{
        setTimeout(()=>{
            setOpen(false);
        },300)
    }}
    className="relative flex flex-col items-center justify-center">
        <button 
        className="cursor-pointer p-2 w-8 h-8 bg-red-800 hover:bg-red-800/80 text-white text-lg flex items-center justify-center rounded-full"
        onClick={()=>setOpen((prev)=>!prev)}>{user && user.fullName[0].toUpperCase()}</button>
        {open && <div className="rounded-[2px] shadow bg-white dark:bg-gray-700 w-48 absolute z-[99] top-full right-0 flex flex-col">
            <div 
            onClick={()=>setUser(null)}
            tabIndex={-1} 
            className="w-full p-3 flex items-center gap-2 text-black dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-100 hover:dark:bg-gray-600 text-sm">
                <LogOutIcon size={16} /> <span>Logout</span>
            </div>
        </div>}
    </div>
  )
}
