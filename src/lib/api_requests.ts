import {fetch} from '@tauri-apps/plugin-http';
import { ShopType } from './types';
import { ADMIN_URL, SHOP_OUTLET_URL } from './data';

export const admin_login = async (url:string, email: string, password: string) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const res = await response.json();
        return {
            success:res.success,
            data:res.data,
            message:res.message
        }
    } catch (error) {
        console.log("Error logging admin in", error);
        return {
            success:false,
            data:null,
            error:error
        }
    }
}

export const admin_register = async (url:string, data:{
    fullName:string;
    phoneNumber:string;
    email:string;
    password:string;
}) => {
    try {
        const {
            fullName,
            phoneNumber,
            email,
            password,
        } = data;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                fullName,
                phoneNumber,
                email,
                password
            })
        });
        const res = await response.json();
        return {
            success:res.success,
            data:res.data,
            message:res.message
        }
    } catch (error) {
        console.log("Error signing up", error);
        return {
            success:false,
            data:null,
            error:error
        }
    }
}

export const get_admin_user = async (id:string|number) => {
    try {
        const url = `${ADMIN_URL}?adminUserId=${id}`
        const response = await fetch(url);
        const res = await response.json();
        return {
            success:res.success,
            data:res.data,
            message:res.message
        }
    } catch (error) {
        console.log("Error fetching admin user:", error);
        return {
            success:false,
            data:null,
        }
    }
}

export const admin_shop_update = async (url:string, userId:string|number, shopId:string|number, data:{
    name:string;
    type:ShopType;
    description?:string;
    address?:string;
    website?:string;
    city?:string;
    country?:string;
    imageUrl?:string;
}) => {
    try {
        console.log({data});
        const {
            name,
            type,
            description,
            address,
            website,
            city,
            country,
            imageUrl
        } = data;
        const response = await fetch(`${url}?shopId=${shopId}&adminUserId=${userId}`, {
            method: 'PUT',
            body: JSON.stringify({
                name,
                type,
                description:description||null,
                address:address||null,
                website:website||null,
                city:city||null,
                country:country||null,
                imageUrl:imageUrl||null
            })
        });
        const res = await response.json();
        console.log({res});
        return {
            success:res.success,
            data:res.data,
            message:res.message
        }
    } catch (error) {
        console.log("Error updating business details", error);
        return {
            success:false,
            data:null,
            error:error
        }
    }
}

export const addShopOutlet = async (url:string, data:{
    shopId:string|number;
    adminUserId:string|number;
    name:string;
    address?:string;
    city?:string;
    country?:string;
}) => {
    try {
        const {shopId,name,address,city,country,adminUserId} = data;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                shopId,
                adminUserId,
                name,
                address: address||null,
                city: city||null,
                country: country||null
            })
        });
        const res = await response.json();
        return {
            success:res.success,
            data:res.data,
            message:res.message
        }
    } catch (error) {
        console.log("Error adding shop outlet", {error});
        return {
            success:false,
            data:null,
            message:"An error occurred"
        }
    }
}

export const editOutlet = async (id:string|number, data:{
    name:string;
    address:string;
    city:string;
    country:string;
    shopId:string|number;
    adminUserId:string|number;
}) => {
    try {
        const url = SHOP_OUTLET_URL;
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({
                name:data.name,
                address: data.address,
                city: data.city,
                country: data.country,
                outletId:id,
                shopId:data.shopId,
                adminUserId:data.adminUserId,                
            })
        });
        const res = await response.json();

        return {
            success:res.success,
            data:res.data,
            message:res.message
        }
    } catch (error) {
        console.log("Error editing outlet", {error});
        return {
            success:false,
            data:null,
            message:"An error occurred"
        }
    }
}
