import { ColumnDef } from "@tanstack/react-table";
import { Invoice } from "./types";
import { cn, formatCurrency } from "./utils";
import useUser from "~/hooks/use-user";
import useSettings from "~/hooks/use-settings";
import { DEFAULT_COUNTRY } from "./data";
import { EyeIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

export const invoiceColumns: ColumnDef<Invoice>[] = [
    {
      accessorKey: "id",
      header: "Invoice ID",
    },
    {
      accessorKey: "amount",
      header: () => {
        const {currency} = useSettings((state)=>state);
        return <div className="text-right">Amount ({currency})</div>
      },
      cell: ({ row }) => {
        const {user} = useUser((state)=>state);
        const {currency} = useSettings((state)=>state);

        const amount = parseFloat(row.getValue("amount"));
        const formatted = formatCurrency(amount,currency,user?.shop.country||DEFAULT_COUNTRY,false);
   
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell:({row}) => {
        const value = row.getValue("status") as string;
        return <div className={cn(
            "flex items-center justify-center capitalize p-1 rounded-lg",
            value==="paid" ?
            "bg-green-700/20 text-green-700" :
            value==="pending" ? 
            "bg-yellow-600/20 text-yellow-600" :
            "bg-red-700/20 text-red-700"
        )}>
            <span>{value.toLowerCase()}</span>
        </div>
      }
    },
    {
        id: "actions",
        header: "View",
        cell: ({ row }) => {
          const invoice = row.original
          
          return (
            <Button asChild variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <Link to={`/dashboard/invoices/${invoice.id}`}>
                    <EyeIcon className="h-4 w-4" />
                </Link>
            </Button>
          )
        },
      },
  ]