import { ShopOutlet } from "~/lib/types"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { useState } from "react"
import useOutlets from "~/hooks/use-outlets"

const DeleteOutletForm = ({outlet}:{outlet:ShopOutlet}) => {
    const [openForm, setOpenForm] = useState(false);
    const {outlets, setOutlets} = useOutlets((state)=>state);

    const deleteOutlet = () => {
        setOutlets(outlets.filter((otl)=>otl.$id!==outlet.$id));
        setOpenForm(false);
    }

  return (
    <Dialog open={openForm} onOpenChange={(v)=>setOpenForm(v)}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Outlet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Outlet?</DialogTitle>
          <DialogDescription>
            <p>Are you sure you want to delete {outlet.name.length > 0 ? outlet.name : "this outlet"}?</p>
            <p>This action is irreversible</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={deleteOutlet}>Confirm Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteOutletForm