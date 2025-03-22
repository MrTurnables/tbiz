import React from "react";
import { ShopOutlet } from "~/lib/types";
import EditOutletForm from "./edit-outlet-form";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { cn } from "~/lib/utils";
import CustomSheet from "./custom-sheet";
import ShopOutletInfoCard from "./shop-outlet-info-card";

interface ShopOutletCardProps {
    outlet:ShopOutlet;
}

const ShopOutletCard:React.FC<ShopOutletCardProps> = ({outlet}) => {
  return (
    <CustomSheet
    title={outlet.name}
    description={outlet.address || ""}
    trigger={<Card
      className={cn(
        "relative bg-gray-50 dark:bg-gray-800 hover:bg-gray-50/30 hover:dark:bg-gray-800/70 cursor-pointer")}>
        <CardHeader>
            <CardTitle>{outlet.name}</CardTitle>
            <CardDescription>
                <p>{outlet.address}</p>
                <p>{outlet.city}</p>
                <p>{outlet.country}</p>
            </CardDescription>
        </CardHeader>
      </Card>}
    >
      <div className="w-full h-full">
        <ShopOutletInfoCard 
            outlet={outlet}
        />
      </div>
    </CustomSheet>
  )
}

export default ShopOutletCard