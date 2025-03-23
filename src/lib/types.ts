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
    // SAFETY_STOCK = "Safety Stock", // Extra inventory to avoid stockouts.
    // CYCLE_STOCK = "Cycle Stock", // Regular inventory needed to meet demand.
    // CONSIGNMENT_INVENTORY = "Consignment Inventory", // Goods stored by a retailer but owned by a supplier.
    // PIPELINE_INVENTORY = "Pipeline Inventory", // Goods in transit from supplier to warehouse.
    // PERISHABLE_INVENTORY = "Perishable Inventory", // Items with an expiration date (e.g., food, medicine).
}

export enum TransactionType {
    PURCHASE = 'purchase',
    SALE = 'sale',
    RETURN = 'return',
    TRANSFER = 'transfer',
    ADJUSTMENT = 'adjustment',
    INITIAL_STOCK = 'initial_stock'
}

export interface ItemType {
    id:string;
    category:ItemCategory;
    name:string;
    sku:string; // Stock keeping unit
    description?:string;
    unitPrice:string;
    createdAt:string;
    updatedAt:string;
}

export interface InventoryEntry {
    id:string;
    sku:string; // Stock keeping unit
    outletId:string;
    invoiceId:string|null;
    supplerId:string|null;
    customerId:string|null;
    name:string;
    category:ItemCategory;
    pricePerUnit:string;
    units:number;
    safetyStock:number; // Safety stock threshold
    description?:string;
    recordedAt:string;
    createdAt:string;
    updatedAt:string;
}

export interface OpeningStockEntry {
    id:string;
    itemId:string;
    sku:string;
    itemName:string;
    pricePerUnit:string;
    units:number;
    total_stock_value:string;
    createdAt:string;
    updatedAt:string;
}

export interface CurrentStockEntry {
    id:string;
    itemId:string;
    outletId:string;
    sku:string;
    itemName:string;
    pricePerUnit:string;
    openingStock:number;
    purchases:number;
    sales:number;
    closingStock:number;
    totalStockValue:string;
    recordedAt:string;
    createdAt:string;
    updatedAt:string;
}

export interface PurchaseEntry {
    id:string;
    itemId:string;
    transactionId:string;
    outletId:string;
    supplierId:string|null;
    sku:string;
    date:string;
    itemName:string;
    pricePerUnit:string;
    units:number;
    totalStockValue:string;
    notes?:string;
    createdAt:string;
    updatedAt:string;
}

export interface SaleEntry {
    id:string;
    itemId:string;
    transactionId:string;
    invoiceId:string;
    outletId:string;
    customerId:string|null;
    sku:string;
    date:string;
    itemName:string;
    pricePerUnit:string;
    units:number;
    totalStockValue:string;
    notes?:string;
    createdAt:string;
    updatedAt:string;
}

export interface Transaction {
    id:string;
    itemId:string;
    type:TransactionType;
    quantity:number; // Non-zero. +ve for stock in, -ve for stock out
    fromLocationId:string|null;
    toLocationId:string|null;
    price:string;
    transactionDate:string;
    createdAt:string;
    updatedAt:string;
    notes?:string;
}

export type TrackingInventory = InventoryEntry[];
export type OpeningStock = Record<string, OpeningStockEntry[]>;
export type CurrentStock = Record<string, CurrentStockEntry[]|undefined>;
export type Purchases = PurchaseEntry[];
export type Sales = SaleEntry[];

export interface SupplierType {
    id:string;
    name:string;
    contactPerson?:string;
    phone?:string;
    email?:string;
    address?:string;
    createdAt:string;
    updatedAt:string;
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
