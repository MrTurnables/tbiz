import { useState } from "react"
import { PlusIcon } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { ItemCategory } from "~/lib/types"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const InventoryForm = ({category}:{category:ItemCategory}) => {
    const [openForm, setOpenForm] = useState(false);
    const [itemName, setItemName] = useState("");
    const categoryName = category===ItemCategory.FINISHED_GOODS ? 
                        "Finished Good" :
                        category===ItemCategory.MRO ?
                        "Maintenance Item" :
                        category===ItemCategory.RAW_MATERIAL ? 
                        "Raw Material" :
                        category===ItemCategory.WIP ?
                        "Work-in-progress Item" : null;

    const clearForm = () => {
        setItemName("");
    }

    const createItem = () => {
        setOpenForm(false);
        clearForm()
    }

/*
id:string;
    sku:string; // Stock keeping unit
    outletId:string;
    imageUrl?:string;
    invoiceId:string|null;
    supplerId:string|null;
    customerId:string|null;
    name:string;
    category:ItemCategory;
    pricePerUnit:string;
    units:number;
    safetyStock:number; // Safety stock threshold
    description?:string;
    recordedAt:string;
    createdAt:string;
    updatedAt:string;
*/

  return (
    <Dialog open={openForm} onOpenChange={(v)=>setOpenForm(v)}>
      <DialogTrigger asChild>
        <Button className='flex gap-2'>
            <PlusIcon className='w-4 h-4' />
            <span className='capitalize'>Add {categoryName}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New {categoryName}</DialogTitle>
          <DialogDescription>
            Add a new {categoryName?.toLowerCase()}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-right">
              Item Name
            </Label>
            <Input id="name" value={itemName} onChange={(e)=>setItemName(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={createItem} className="cursor-pointer" type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default InventoryForm