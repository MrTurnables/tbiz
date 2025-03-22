import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import useOutlets from "~/hooks/use-outlets";
import { ShopOutlet, ShopOutletType } from "~/lib/types";

interface AddShopOutletFormProps {
    initial:{
        name:string;
        address?:string;
        city?:string;
        country?:string;
    };
    shopId:string;
    userId:string;
}

const AddShopOutletForm:React.FC<AddShopOutletFormProps> = ({initial, shopId, userId}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const {outlets, setOutlets} = useOutlets((state)=>state);

  const clearForm = () => {
    setName("");
    setAddress("");
    setCity("");
    setCountry("");
  }

  const createOutlet = () => {
    setLoading(true);
    const data = {
        $id:uuidv4(),
        type:ShopOutletType.BRANCH,
        shopId:shopId,
        adminUserId:userId,
        name,
        address,
        city,
        country
    } as ShopOutlet;
    setOutlets([...outlets,data]);
    clearForm();
    setOpenForm(false);
    setLoading(false);
  }

  useEffect(()=>{
    setName(initial.name);
    setAddress(initial.address||"");
    setCity(initial.city||"");
    setCountry(initial.country||"");
  },[initial])

  return (
    <Dialog open={openForm} onOpenChange={(v)=>setOpenForm(v)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 cursor-pointer">
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