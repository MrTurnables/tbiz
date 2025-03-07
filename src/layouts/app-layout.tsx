import { Navigate, Outlet } from "react-router";
import Navbar from "~/components/navbar";
import { ThemeProvider } from "~/components/theme-provider";
import { AppSidebar } from "~/components/ui/app-sidebar";
import { SidebarProvider } from "~/components/ui/sidebar";
import useUser from "~/hooks/use-user";

const AppLayout = () => {
  const {user} = useUser((state)=>state);

  if(!user) {
    console.log("Not logged in");
    return <Navigate to="/" replace />;
  }

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