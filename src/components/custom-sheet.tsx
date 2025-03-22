import React from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

interface CustomSheetProps {
    title:string;
    description:string;
    trigger:React.ReactNode;
    children:React.ReactNode;
}

const CustomSheet:React.FC<CustomSheetProps> = ({
    title,
    description,
    trigger,
    children
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {description}
          </SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}

export default CustomSheet