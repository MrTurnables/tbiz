import React from "react";
import { ShopOutlet } from "~/lib/types"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface ShopOutletCardProps {
    outlet:ShopOutlet;
}

const ShopOutletCard:React.FC<ShopOutletCardProps> = ({outlet}) => {
  return (
    <Card>
        <CardHeader>
            <CardTitle title={outlet.name} />
            <CardDescription>
                {outlet.address}, {outlet.city}, {outlet.country}
            </CardDescription>
        </CardHeader>
    </Card>
  )
}

export default ShopOutletCard