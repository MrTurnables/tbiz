import { PlusIcon } from "lucide-react"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { addShopOutlet } from "~/lib/api_requests"
import { SHOP_OUTLET_URL } from "~/lib/data"
import { Shop } from "~/lib/types"

interface AddShopOutletFormProps {
    initial:{
        name:string;
        address?:string;
        city?:string;
        country?:string;
    };
    shop:Shop|null;
}

const AddShopOutletForm:React.FC<AddShopOutletFormProps> = ({initial, shop}) => {
    const [_, startTransition] = useTransition();
    const [name, setName] = useState(initial.name);
    const [address, setAddress] = useState(initial.address||"");
    const [city, setCity] = useState(initial.city||"");
    const [country, setCountry] = useState(initial.city||"");
    const [openForm, setOpenForm] = useState(false);
    const [loading, setLoading] = useState(false);

    const createOutlet = () => {
        setLoading(true);
        const data = {
            shopId:shop?.$id || "",
            name,
            address,
            city,
            country
        }
        const url = SHOP_OUTLET_URL;
        startTransition(()=>{
            addShopOutlet(url, data).then((response)=>{
                console.log({response});
                if(response.success){
                    toast.success("Outlet created");
                }else{
                    toast.error("Something went wrong");
                }
            }).catch((error:any)=>{
                console.log({error});
                toast.error("Something went wrong");
            }).finally(()=>{
                setLoading(false);
            })
        })
    }

  return (
    <Dialog open={openForm} onOpenChange={(v)=>setOpenForm(v)}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 cursor-pointer">
            <PlusIcon className="w-4 h-4" />
            <span>New Outlet</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Outlet</DialogTitle>
          <DialogDescription>
            Add a new outlet or location for your business
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-right">
              Name<span className="text-red-600">*</span>
            </Label>
            <Input disabled={loading} id="name" value={name} onChange={(e)=>setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input disabled={loading} id="address" value={address} onChange={(e)=>setAddress(e.target.value)} className="col-span-3" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="city" className="text-right">
              City
            </Label>
            <Input disabled={loading} id="city" value={city} onChange={(e)=>setCity(e.target.value)} className="col-span-3" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="country" className="text-right">
              Country
            </Label>
            <Input disabled={loading} id="country" value={country} onChange={(e)=>setCountry(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={loading} onClick={createOutlet} className="cursor-pointer" type="submit">
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddShopOutletForm