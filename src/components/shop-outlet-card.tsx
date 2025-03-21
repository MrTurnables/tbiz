import React from "react";
import { ShopOutlet } from "~/lib/types";
import EditOutletForm from "./edit-outlet-form";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { cn } from "~/lib/utils";

interface ShopOutletCardProps {
    outlet:ShopOutlet;
    selectedOutlet:string|number|null;
    selectOutlet:(id:string)=>void;
}

const ShopOutletCard:React.FC<ShopOutletCardProps> = ({outlet, selectedOutlet, selectOutlet}) => {
  return (
    <Card 
    onClick={()=>selectOutlet(outlet.$id)}
    className={cn(
      "relative bg-gray-50 dark:bg-gray-800 hover:bg-gray-50/30 hover:dark:bg-gray-800/70 cursor-pointer",
      selectedOutlet===outlet.$id ?
      "bg-gray-50/30 dark:bg-gray-800/70" :
      ""
    )}>
      <EditOutletForm outlet={outlet} />
      <CardHeader>
          <CardTitle>{outlet.name}</CardTitle>
          <CardDescription>
              <p>{outlet.address}</p>
              <p>{outlet.city}</p>
              <p>{outlet.country}</p>
          </CardDescription>
      </CardHeader>
    </Card>
  )
}

export default ShopOutletCard