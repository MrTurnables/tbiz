import { type ChartConfig } from "~/components/ui/chart"
import { Invoice } from "./types";

// DB Tables
export const OUTLETS_TABLE = "outlets";

export const BASE_API_URL = "https://tbiz-api.vercel.app/api/v1" as const;
export const ADMIN_LOGIN_URL = `${BASE_API_URL}/login/admin` as const;
export const ADMIN_URL = `${BASE_API_URL}/admin-user` as const;
export const SHOP_URL = `${BASE_API_URL}/shop` as const;
export const SHOP_OUTLET_URL = `${BASE_API_URL}/shop-outlet` as const;

export const DEFAULT_COUNTRY = "ghana";

export const DEFAULT_SALE_REPORT_DATA = [
    { month: "January", store: 186, online: 80 },
    { month: "February", store: 305, online: 200 },
    { month: "March", store: 237, online: 120 },
    { month: "April", store: 73, online: 190 },
    { month: "May", store: 209, online: 130 },
    { month: "June", store: 214, online: 140 },
]

export const DEFAULT_SALE_REPORT_DATA_CHART_CONFIG = {
  store: {
    label: "Store",
    color: "hsl(var(--chart-1))",
  },
  online: {
    label: "Online",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export const DEFAULT_PURCHASE_REPORT_DATA = [
    { month: "January", purchase: 186, returns: 80 },
    { month: "February", purchase: 305, returns: 200 },
    { month: "March", purchase: 237, returns: 120 },
    { month: "April", purchase: 73, returns: 190 },
    { month: "May", purchase: 209, returns: 130 },
    { month: "June", purchase: 214, returns: 140 },
]

export const DEFAULT_PURCHASE_REPORT_DATA_CHART_CONFIG = {
  store: {
    label: "Purchase",
    color: "hsl(var(--chart-1))",
  },
  online: {
    label: "Returns",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export const DEFAULT_SALE_REPEAT_DATA = [
  { month: "January", repeat: 186 },
  { month: "February", repeat: 305 },
  { month: "March", repeat: 237 },
  { month: "April", repeat: 73 },
  { month: "May", repeat: 209 },
  { month: "June", repeat: 214 },
]
export const DEFAULT_SALE_REPEAT_DATA_CHART_CONFIG = {
  repeat: {
    label: "Repeat Customers",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export const DEFAULT_INVOICE_LIST:Invoice[] = [
  {
    id: "#728ed52f",
    amount: 100,
    status: "paid",
    name: "john doe",
  },
  {
    id: "#874yr8hd",
    amount: 180,
    status: "pending",
    name: "jane doe",
  },
  {
    id: "#98h3fr9c",
    amount: 200,
    status: "paid",
    name: "george graham",
  },
  {
    id: "#u7f478f4",
    amount: 80,
    status: "canceled",
    name: "dave peltzer",
  },
  // {
  //   id: "#y78347hr",
  //   amount: 120,
  //   status: "paid",
  //   name: "john doe",
  // },
  // {
  //   id: "#k8934r89",
  //   amount: 195,
  //   status: "paid",
  //   name: "george graham",
  // },
];

export const DATABASE_SYNCHRONIZATION_FILE = "sync.json";
