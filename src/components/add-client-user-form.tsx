import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
import useUserAccounts from "~/hooks/use-accounts";
import { ClientUser } from "~/lib/types";

interface AddClientUserFormProps {
    initial:{
        fullName:string;
        phoneNumber:string;
        email:string;
    };
    shopId:string;
}

const AddClientUserForm:React.FC<AddClientUserFormProps> = ({initial, shopId}) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const {userAccounts, setUserAccounts} = useUserAccounts((state)=>state);

  const clearForm = () => {
    setFullName("");
    setPhoneNumber("");
    setEmail("");
  }

  const handlePhoneNumber = (value:string)=>{
    setPhoneNumber(value);
    setPassword(value);
  }

  const creatClientUser = () => {
    setLoading(true);
    if(!fullName || fullName.trim().length === 0){
      toast.error("Name is required!");
      setLoading(false);
      return;
    }
    if(!phoneNumber || phoneNumber.trim().length === 0){
      toast.error("Phone number is required!");
      setLoading(false);
      return;
    }
    const data = {
        $id:uuidv4(),
        fullName,
        phoneNumber,
        email,
        shopId,
        password,
    } as ClientUser;
    setUserAccounts([...userAccounts, data]);
    clearForm();
    setOpenForm(false);
    setLoading(false);
    toast.success("User added successfully!");
  }

  useEffect(()=>{
    setFullName(initial.fullName);
    setPhoneNumber(initial.phoneNumber||"");
    setEmail(initial.email||"");
    setPassword(initial.phoneNumber||"");
  },[initial])

  return (
    <Dialog open={openForm} onOpenChange={(v)=>setOpenForm(v)}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 cursor-pointer">
            <PlusIcon className="w-4 h-4" />
            <span>New User</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New User</DialogTitle>
          <DialogDescription>
            Add a new user
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="full-name" className="text-right">
              Name<span className="text-red-600">*</span>
            </Label>
            <Input disabled={loading} id="full-name" value={fullName} onChange={(e)=>setFullName(e.target.value)} className="col-span-3" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone-number" className="text-right">
              Phone Number
            </Label>
            <Input disabled={loading} id="phone-number" value={phoneNumber} onChange={(e)=>handlePhoneNumber(e.target.value)} className="col-span-3" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-right">
              E-mail
            </Label>
            <Input type="email" disabled={loading} id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="col-span-3" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-right">
              Default Password (Phone number)
            </Label>
            <Input disabled={true} id="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={loading} onClick={creatClientUser} className="cursor-pointer">
            {loading ? "Adding..." : "Add Account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddClientUserForm