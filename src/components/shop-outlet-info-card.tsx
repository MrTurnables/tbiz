import { ShopOutlet } from "~/lib/types";
import EditOutletForm from "./edit-outlet-form";
import DeleteOutletForm from "./delete-outlet-form";

interface ShopOutletInfoCardProps {
    outlet: ShopOutlet | null | undefined;
}


const ShopOutletInfoCard:React.FC<ShopOutletInfoCardProps> = ({outlet}) => {
    if(!outlet){
        return null;
    }
  return (
    <div className="flex flex-col gap-3 w-full h-full px-4">
      <EditOutletForm outlet={outlet} buttonPostion="normal" />
      <DeleteOutletForm outlet={outlet} />
    </div>
  )
}

export default ShopOutletInfoCard