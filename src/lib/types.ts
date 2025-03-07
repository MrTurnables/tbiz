export enum ShopType {
    FOOD = 'food_&_beverage',
    RETAIL = 'retail_&_grocery'
}

export interface ClientUser {
    $id:string;
    fullName: string;
    phoneNumber: string;
    email?: string;
    password: string;
    shop: Shop;
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
}

export interface AuthUser {
    $id:string;
    email: string;
    fullName: string;
    phoneNumber: string;
    shop: Shop;
}
