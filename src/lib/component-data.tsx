import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, EyeIcon, MinusIcon, MoreHorizontal } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import useUserAccounts from "~/hooks/use-accounts";
import useSettings from "~/hooks/use-settings";
import { DEFAULT_COUNTRY } from "./data";
import { ClientUser, InventoryEntry, Invoice } from "./types";
import { cn, formatCurrency } from "./utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";

export const invoiceColumns: ColumnDef<Invoice>[] = [
    {
      accessorKey: "id",
      header: "Invoice ID",
    },
    {
      accessorKey: "amount",
      header: ({column}) => {
        const {currency} = useSettings((state)=>state);
        return <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-right flex items-center gap-2 cursor-pointer">
          <span>Amount ({currency})</span>
          <ArrowUpDown className="w-4 h-4" />
        </div>
      },
      cell: ({ row }) => {
        const {currency} = useSettings((state)=>state);

        const amount = parseFloat(row.getValue("amount"));
        const formatted = formatCurrency(amount,currency,DEFAULT_COUNTRY,false);
   
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

export const userAccountsColumns: ColumnDef<ClientUser>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell:({row}) => {
      return <div>{row.index+1}</div>
    }
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span>Name</span>
          <ArrowUpDown className="w-4 h-4" />
        </div>
      )
    },
  }, 
  {
    accessorKey:"phoneNumber",
    header: "Phone number",
  },
  {
    accessorKey:"email",
    header: "E-mail",
  },
  {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const clientUser = row.original
        const {userAccounts, editUserAccount, removeUserAccount} = useUserAccounts((state)=>state)

        const toggleActivateUser = () => {
          const currentUser = userAccounts.find((usa)=>usa.$id===clientUser.$id);
          if(currentUser){
            editUserAccount({...currentUser, active:!currentUser.active});
          }
        }

        const deleteUser = () => {
          removeUserAccount(clientUser.$id);
        }
        
        return (
          <div className="flex gap-2">
            <Button 
            className={cn("border w-[100px]", clientUser.active ? "border-red-700" : "border-green-800")}
            variant={clientUser.active ? "secondary" : "ghost"}
            onClick={toggleActivateUser}>
              {clientUser.active ? "Deactivate" : "Activate"}
            </Button>
            <Button variant="destructive" onClick={deleteUser} className="flex gap-2 items-center">
              <MinusIcon className="w-4 h-4"/>
              <span>Delete</span>
            </Button>
          </div>
        )
      },
    },
]

export const inventoryColumns: ColumnDef<InventoryEntry>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell:({row})=>{
      const id = row.getValue("id") as string;
      return <div>{id.substring(0,6)}</div>
    }
  },
  {
    accessorKey: "sku",
    header: "SKU"
  },
  {
    accessorKey: "name",
    header: "Item",
  },
  {
    accessorKey: "pricePerUnit",
    header: "Price/unit",
  },
  {
    accessorKey: "units",
    header: "Avail. Quantity",
  },
  {
    accessorKey: "safetyStock",
    header: "Safety Stock",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.getValue("id"); 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
