import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import Navbar from "~/components/navbar";
import { SetupBusinessProfile } from "~/components/setup-business-profile";
import { ThemeProvider } from "~/components/theme-provider";
import { AppSidebar } from "~/components/ui/app-sidebar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { SidebarProvider } from "~/components/ui/sidebar";
import useOutlets from "~/hooks/use-outlets";
import useProfile from "~/hooks/use-profile";
import useUser from "~/hooks/use-user";
import { get_admin_user } from "~/lib/api_requests";
import { BusinessProfileFormType, ShopOutletType } from "~/lib/types";

const AppLayout = () => {
  const [setupProfileForm, setSetupProfileForm] = useState(false);
  const {user, setUser} = useUser((state)=>state);
  const { profile, setProfile } = useProfile((state)=>state);
  const { addOutlet } = useOutlets((state)=>state);
  const navigate = useNavigate();

  const saveProfile = (data:BusinessProfileFormType) => {
    setProfile(data);
    addOutlet({
      $id:uuidv4(),
      name:data.outletName || "",
      type: ShopOutletType.MAIN,
      address:data.address,
      city:data.city,
      country:data.country
    });
    toast.success("Profile saved");
  }

  useEffect(()=>{
    if(user){
      get_admin_user(user?.$id||"").then((response)=>{
        if(response.success){
          setUser(response.data);
        }else{
          toast.error("Session not updated. Check your internet connection");
        }
      });
    }
  },[]);

  useEffect(()=>{
    if(!user){
      navigate("/");
    }
  },[user])

  useEffect(()=>{
    if(!profile){
      setSetupProfileForm(true);
    }else{
      setSetupProfileForm(false);
    }
  },[profile])

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full min-h-full">
          <Navbar />
          <Outlet />
          {setupProfileForm && 
            <Dialog open={setupProfileForm}>
              <DialogContent className="max-w-[840px]">
                <DialogHeader>
                  <DialogTitle>Business profile</DialogTitle>
                  <DialogDescription>To continue, set up your business profile</DialogDescription>
                </DialogHeader>
                <SetupBusinessProfile
                  submitProfile={saveProfile}
                />
              </DialogContent>
            </Dialog>
          }
        </main>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default AppLayout