export enum ShopType {
    FOOD = 'food_&_beverage',
    RETAIL = 'retail_&_grocery'
}

export enum ShopOutletType {
    MAIN = "main",
    BRANCH = "branch"
}

export interface ClientUser {
    $id:string|number;
    fullName: string;
    phoneNumber: string;
    email?: string;
    password: string;
    shop: Shop;
}

export interface ShopOutlet {
    $id:string|number;
    name:string;
    address?:string;
    city?:string;
    country?:string;
    type: ShopOutletType;
}

export interface Shop {
    $id:string|number;
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
    $id:string|number;
    email: string;
    fullName: string;
    phoneNumber: string;
    shop: Shop;
}

export type Invoice = {
  id: string|number;
  amount: number;
  status: "paid" | "pending" | "canceled";
  name: string;
}

