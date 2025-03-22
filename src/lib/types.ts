export enum ShopType {
    FOOD = 'food_&_beverage',
    RETAIL = 'retail_&_grocery'
}

export enum ShopOutletType {
    MAIN = "main",
    BRANCH = "branch",
    WAREHOUSE="warehouse"
}

export interface ClientUser {
    $id:string;
    fullName: string;
    phoneNumber: string;
    email?: string;
    password: string;
    shopId: string;
    active?:boolean;
}

export interface ShopOutlet {
    $id:string;
    name:string;
    address?:string;
    city?:string;
    country?:string;
    type: ShopOutletType;
}

export interface Shop {
    $id:string;
    adminUsers: AuthUser;
    name:string;
    description?:string;
    imageUrl?:string;
    address?:string;
    type: ShopType;
    city?:string;
    country?:string;
    clientUsers: ClientUser[];
    outlets: ShopOutlet[];
}

export interface AuthUser {
    $id:string;
    email: string;
    fullName: string;
    phoneNumber: string;
    password?: string;
    shopId: string;
}

export type Invoice = {
  id: string;
  amount: number;
  status: "paid" | "pending" | "canceled";
  name: string;
}

export enum ItemCategory {
    RAW_MATERIAL = "Raw Material", // Basic materials used in manufacturing (e.g., wood, metal, fabric).
    WIP = "Work-in-Progress", // Partially completed goods still in the production process.
    FINISHED_GOODS = "Finished Goods", // Completed products ready for sale.
    MRO = "Maintenance, Repair, and Operations", // Supplies used for operational needs (e.g., cleaning supplies, spare parts).
    SAFETY_STOCK = "Safety Stock", // Extra inventory to avoid stockouts.
    CYCLE_STOCK = "Cycle Stock", // Regular inventory needed to meet demand.
    CONSIGNMENT_INVENTORY = "Consignment Inventory", // Goods stored by a retailer but owned by a supplier.
    PIPELINE_INVENTORY = "Pipeline Inventory", // Goods in transit from supplier to warehouse.
    PERISHABLE_INVENTORY = "Perishable Inventory", // Items with an expiration date (e.g., food, medicine).
}

export enum TransactionType {
    PURCHASE = 'purchase', 
    SALE = 'sale', 
    RETURN = 'return', 
    TRANSFER = 'transfer', 
    ADJUSTMENT = 'adjustment'
}

export interface ItemType {
    id:string;
    category:ItemCategory;
    name:string;
    sku:string; // Stock keeping unit
    description?:string;
    unitPrice:string;
    createdAt:Date;
    updatedAt:Date;
}

export interface InventoryEntryType {
    id:string;
    itemId:string;
    outletId:string;
    quantity:number;
    minQuantity:number; // Safety stock threshold
    lastUpdated:Date;
}

export type InventoryType = Record<string, InventoryEntryType[]>;

export interface TransactionEntryType {
    id:string;
    itemId:string;
    type:TransactionType;
    quantity:number; // Positive for addition, negative for removal
    fromLocationId:string|null; // Movement from outlet
    toLocationId:string|null; // Movement to outlet
    transactionDate:Date;
    userId:string; // Who made the transaction
}

export interface SupplierType {
    id:string;
    name:string;
    contactPerson?:string;
    phone?:string;
    email?:string;
    address?:string;
    createdAt:Date;
}

export interface ItemSupplierType {
    id:string;
    itemId:string;
    supplerId:string;
    costPrice:string;
    leadTimeDays:number;
}

export interface BusinessProfileFormType {
    businessName:string;
    businessId?:string;
    mainOutletId?:string;
    outletName?:string;
    type:ShopOutletType;
    description?:string;
    address?:string;
    website?:string;
    city?:string;
    country?:string;
}
