import { ShopOutlet } from "~/lib/types"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import EditOutletForm from "./edit-outlet-form";

interface ShopOutletInfoCardProps {
    outlet: ShopOutlet | null | undefined;
}


const ShopOutletInfoCard:React.FC<ShopOutletInfoCardProps> = ({outlet}) => {
    if(!outlet){
        return null;
    }
  return (
    <Card className="relative w-full h-full">
        <EditOutletForm outlet={outlet} />
        <CardHeader>
            <CardTitle>{outlet.name}</CardTitle>
            <CardDescription>{outlet.address}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export default ShopOutletInfoCard