import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { toast } from "sonner";
import Navbar from "~/components/navbar";
import { ThemeProvider } from "~/components/theme-provider";
import { AppSidebar } from "~/components/ui/app-sidebar";
import { SidebarProvider } from "~/components/ui/sidebar";
import useUser from "~/hooks/use-user";
import { get_admin_user } from "~/lib/api_requests";

const AppLayout = () => {
  const {user, setUser} = useUser((state)=>state);

  if(!user) {
    console.log("Not logged in");
    return <Navigate to="/" replace />;
  }

  useEffect(()=>{
    get_admin_user(user.$id).then((response)=>{
      if(response.success){
        setUser(response.data);
      }else{
        toast.error("Session not updated. Check your internet connection");
      }
    });
  },[user]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <Navbar />
          <Outlet />
        </main>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default AppLayout