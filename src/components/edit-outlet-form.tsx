import { SettingsIcon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import useUser from "~/hooks/use-user";
import { editOutlet } from "~/lib/api_requests";
import { OUTLETS_TABLE, SHOP_OUTLET_URL } from "~/lib/data";
import { addToSynchronizationQueue } from "~/lib/synchronization_queues";
import { ShopOutlet } from "~/lib/types";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const EditOutletForm = ({ outlet }:{ outlet:ShopOutlet }) => {
    const [_, startTransition] = useTransition();
    const [name, setName] = useState(outlet.name);
    const [address, setAddress] = useState(outlet.address || null);
    const [city, setCity] = useState(outlet.city || null);
    const [country, setCountry] = useState(outlet.country||null);
    const [loading, setLoading] = useState(false);
    const [openForm, setOpenForm] = useState(false);

    const {user, localAuth, setUser, setLocalAuth} = useUser((state)=>state);

    const submitEditOutlet = ()=>{
      setLoading(true);
      const data = {
        name,
        address:address||"",
        city:city||"",
        country:country||"",
        shopId:user?.shop.$id || "",
        adminUserId:user?.$id || ""
      };
      startTransition(()=>{
        editOutlet(outlet.$id, data).then((response)=>{
          if(response.success && user){
            const updatedOutlet = response.data as ShopOutlet              
            const updatedOutlets = user.shop.outlets.map((outlet)=>{
              if(outlet.$id===updatedOutlet.$id){
                return updatedOutlet;
              }else{
                return outlet;
              }
            });
            const newUserData = {...user};
            newUserData.shop.outlets = updatedOutlets
            setUser(newUserData);

            if(localAuth){
              const newLocalAuthData = {...localAuth};
              if(newLocalAuthData && newLocalAuthData.user?.shop){
                newLocalAuthData.user.shop.outlets = updatedOutlets;
                setLocalAuth(newLocalAuthData);
                console.log({newLocalAuthData});
              }                
            }
            
            setOpenForm(false);
            toast.success(response.message);
          }else{
            toast.error("Error connecting to the server.");
            if(user){
              const newUserData = {...user};
              newUserData.shop.outlets = newUserData.shop.outlets.map((otl)=>{
                if(otl.$id===outlet.$id){
                  return {
                    ...otl,
                    name:data.name,
                    address:data.address,
                    city:data.city,
                    country:data.country,
                    shopId:data.shopId,
                    adminUserId:data.adminUserId,
                  }
                }else{
                  return otl
                }
              })
              setUser(newUserData);

              if(localAuth){
                const newLocalAuthData = { ...localAuth };
                if(newLocalAuthData && newLocalAuthData.user?.shop){
                  newLocalAuthData.user.shop.outlets = newUserData.shop.outlets;
                  setLocalAuth(newLocalAuthData);
                }                
              }

              addToSynchronizationQueue({
                data:{
                  ...data,
                  outletId:outlet.$id
                },
                table:OUTLETS_TABLE,
                verb:"PUT",
                queryParams:null,
                url:SHOP_OUTLET_URL
              }).then((success)=>{
                if(success){
                  toast.success("Outlet updated locally");
                  setOpenForm(false);
                }
              }).catch((error)=>{
                console.log("Error adding request to synchronization queue:", error);
              });
            }
          }
        }).catch((error)=>{
          toast.error("Something went wrong:", error);
        }).finally(()=>{
          setLoading(false);
          setOpenForm(false);
        });
      });
    }

    useEffect(()=>{
      setName(outlet.name);
      setAddress(outlet.address||null);
      setCity(outlet.city||null);
      setCountry(outlet.country||null);
    },[]);

  return (
    <Dialog open={openForm} onOpenChange={(v)=>setOpenForm(v)}>
      <DialogTrigger asChild>
        <Button
        disabled={loading}
        size="icon" 
        variant="ghost" 
        className="absolute top-1 right-1 cursor-pointer rounded-full w-6 h-6">
            <SettingsIcon className="w-4 h-4"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-50 dark:bg-gray-700">
        <DialogHeader>
          <DialogTitle>{outlet.name}</DialogTitle>
          <DialogDescription>
            Edit outlet
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input disabled={loading} id="name" value={name} onChange={(e)=>setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Textarea disabled={loading} id="address" value={address||""} onChange={(e)=>setAddress(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="city" className="text-right">
              City
            </Label>
            <Input disabled={loading} id="city" value={city||""} onChange={(e)=>setCity(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="country" className="text-right">
              Country
            </Label>
            <Input disabled={loading} id="country" value={country||""} onChange={(e)=>setCountry(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={loading} variant="destructive" className="cursor-pointer" onClick={()=>setOpenForm(false)}>Cancel</Button>
          <Button disabled={loading} type="submit" onClick={submitEditOutlet} className="cursor-pointer">{loading ? "Saving..." : "Save changes"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditOutletForm
