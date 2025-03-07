import {fetch} from '@tauri-apps/plugin-http';
import { ShopType } from './types';

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

export const admin_shop_update = async (url:string, userId:string, shopId:string, data:{
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