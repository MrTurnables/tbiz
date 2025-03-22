import { ChartColumnBig, DatabaseIcon, ReceiptTextIcon, ShoppingBasketIcon, StoreIcon, TicketCheckIcon, User2Icon } from "lucide-react";

export const sidebarRoutes = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: ChartColumnBig,
    },
    {
      title: "Outlets",
      url: "/dashboard/outlets",
      icon: StoreIcon,
    },
    {
      title: "Users",
      url: "/dashboard/users",
      icon: User2Icon,
    },
    {
      title: "Inventory",
      url: "/dashboard/inventory",
      icon: DatabaseIcon,
    },
    {
      title: "Purchases",
      url: "/dashboard/purchases",
      icon: TicketCheckIcon,
    },
    {
      title: "POS",
      url: "/dashboard/pos",
      icon: ShoppingBasketIcon,
    },
    {
      title: "Invoices",
      url: "/dashboard/invoices",
      icon: ReceiptTextIcon,
    },
  ]