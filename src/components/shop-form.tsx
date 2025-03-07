"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { shopFormSchema } from "~/lib/schema"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { ShopType } from "~/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import useUser from "~/hooks/use-user"

export const ShopForm = ({
    loading, 
    submitShopForm
}:{
    loading:boolean;
    submitShopForm:(values:{
        name:string;
        type:ShopType;
        description?:string;
        address?:string;
        website?:string;
        city?:string;
        country?:string;
        imageUrl?:string;
    })=>void;
}) => {
    const {user} = useUser((state)=>state);
    const form = useForm<z.infer<typeof shopFormSchema>>({
        resolver: zodResolver(shopFormSchema),
        defaultValues: {
            name:"",
            type: user?.shop.type || ShopType.RETAIL,
            description:"",
            address:"",
            website:"",
            city:"",
            country:"",
            imageUrl:""
        },
    });

  function onSubmit(values: z.infer<typeof shopFormSchema>) {
    const {type, ...rest} = values;
    submitShopForm({
        ...rest,
        type: type as ShopType
    });
  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field, formState }) => {
                    return <FormItem>
                        <label htmlFor="shop-name">Business name</label>
                        <FormControl>
                            <Input disabled={loading} id="shop-name" {...field} />
                        </FormControl>
                        {formState.errors.name && <p className="text-sm text-red-700 italic">
                            {formState.errors.name.message}
                        </p>}
                    </FormItem>
                }}
            />
            
            <FormField
                control={form.control}
                name="type"
                render={({ field, formState }) => {
                    return <FormItem>
                        <label htmlFor="shop-type">Business type</label>
                        <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}>
                            <FormControl className="w-full">
                                <SelectTrigger>
                                    <SelectValue
                                    placeholder="Select business type" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem className="capitalize" value={ShopType.FOOD}>{ShopType.FOOD.split("_").join(" ")}</SelectItem>
                                <SelectItem className="capitalize" value={ShopType.RETAIL}>{ShopType.RETAIL.split("_").join(" ")}</SelectItem>
                            </SelectContent>
                        </Select>
                        {formState.errors.type && <p className="text-sm text-red-700 italic">
                            {formState.errors.type.message}
                        </p>}
                    </FormItem>
                }}
            />
            
            <FormField
                control={form.control}
                name="description"
                render={({ field, formState }) => {
                    return <FormItem>
                        <label htmlFor="shop-description">Description</label>
                        <FormControl>
                            <Textarea disabled={loading} id="shop-description" {...field} />
                        </FormControl>
                        {formState.errors.description && <p className="text-sm text-red-700 italic">
                            {formState.errors.description.message}
                        </p>}
                    </FormItem>
                }}
            />
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field, formState }) => {
                        return <FormItem>
                            <label htmlFor="shop-address">Address</label>
                            <FormControl>
                                <Input disabled={loading} id="shop-address" {...field} />
                            </FormControl>
                            {formState.errors.address && <p className="text-sm text-red-700 italic">
                                {formState.errors.address.message}
                            </p>}
                        </FormItem>
                    }}
                />
                <FormField
                    control={form.control}
                    name="website"
                    render={({ field, formState }) => (
                        <FormItem>
                            <label htmlFor="shop-website">Website</label>
                            <FormControl>
                                <Input type="url" disabled={loading} id="shop-website" placeholder="https://site.com" {...field} />
                            </FormControl>
                            {formState.errors.website && <p className="text-sm text-red-700 italic">
                                {formState.errors.website.message}
                            </p>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field, formState }) => (
                        <FormItem>
                            <label htmlFor="shop-city">City</label>
                            <FormControl>
                                <Input disabled={loading} id="shop-city" {...field} />
                            </FormControl>
                            {formState.errors.city && <p className="text-sm text-red-700 italic">
                                {formState.errors.city.message}
                            </p>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field, formState }) => (
                        <FormItem>
                            <label htmlFor="shop-country">Country</label>
                            <FormControl>
                                <Input disabled={loading} id="shop-country" {...field} />
                            </FormControl>
                            {formState.errors.country && <p className="text-sm text-red-700 italic">
                                {formState.errors.country.message}
                            </p>}
                        </FormItem>
                    )}
                />
            </div>
            <Button 
                disabled={loading}
                type="submit"
                className="cursor-pointer flex items-center gap-2"
            >
                <span>{loading ? "Saving..." : "Save"}</span>
            </Button>
        </form>
    </Form>
  )
}
