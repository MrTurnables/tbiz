import { zodResolver } from "@hookform/resolvers/zod"
import { SaveIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { BusinessProfileFormSchema } from "~/lib/schema"
import { BusinessProfileFormType, ShopOutletType } from "~/lib/types"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"
import { Textarea } from "./ui/textarea"

export const SetupBusinessProfile = ({
    loading, 
    submitProfile,
}:{
    loading:boolean, 
    submitProfile:(values:BusinessProfileFormType)=>void;
}) => {
    const form = useForm<z.infer<typeof BusinessProfileFormSchema>>({
        resolver: zodResolver(BusinessProfileFormSchema),
        defaultValues: {
            businessName:"",
            outletName:"",
            outletType:ShopOutletType.MAIN,
            description:"",
            address:"",
            website:"",
            city:"",
            country:""
        },
    });

  function onSubmit(values: z.infer<typeof BusinessProfileFormSchema>) {
    const data = {
        businessName:values.businessName,
        outletName: values.outletName,
        type: values.outletType as ShopOutletType,
        description:values.description,
        address:values.address,
        website:values.website,
        city:values.city,
        country:values.country,
    } as BusinessProfileFormType;
    submitProfile(data);
  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                control={form.control}
                name="businessName"
                render={({ field, formState }) => {
                    return <FormItem>
                        <label htmlFor="business-name">Business name</label>
                        <FormControl>
                            <Input disabled={loading} id="business-name" {...field} />
                        </FormControl>
                        {formState.errors.businessName && <p className="text-sm text-red-700 italic">
                            {formState.errors.businessName.message}
                        </p>}
                    </FormItem>
                }}
            />
            <FormField
                control={form.control}
                name="description"
                render={({ field, formState }) => {
                    return <FormItem>
                        <label htmlFor="description">Description</label>
                        <FormControl>
                            <Textarea disabled={loading} id="description" {...field} />
                        </FormControl>
                        {formState.errors.description && <p className="text-sm text-red-700 italic">
                            {formState.errors.description.message}
                        </p>}
                    </FormItem>
                }}
            />
            <Separator/>

            <div className="flex gap-4 justify-between">
                <FormField
                    control={form.control}
                    name="outletName"
                    render={({ field, formState }) => {
                        return <FormItem className="flex-grow">
                            <label htmlFor="outlet-name">Main outlet</label>
                            <FormControl>
                                <Input disabled={loading} id="outlet-name" {...field} />
                            </FormControl>
                            {formState.errors.outletName && <p className="text-sm text-red-700 italic">
                                {formState.errors.outletName.message}
                            </p>}
                        </FormItem>
                    }}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field, formState }) => {
                        return <FormItem className="flex-grow">
                            <label htmlFor="address">Address</label>
                            <FormControl>
                                <Input disabled={loading} id="address" {...field} />
                            </FormControl>
                            {formState.errors.address && <p className="text-sm text-red-700 italic">
                                {formState.errors.address.message}
                            </p>}
                        </FormItem>
                    }}
                />
            </div>

            <div className="flex gap-4 justify-between">
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field, formState }) => {
                        return <FormItem className="flex-grow">
                            <label htmlFor="country">Country</label>
                            <FormControl>
                                <Input disabled={loading} id="country" {...field} />
                            </FormControl>
                            {formState.errors.country && <p className="text-sm text-red-700 italic">
                                {formState.errors.country.message}
                            </p>}
                        </FormItem>
                    }}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field, formState }) => {
                        return <FormItem className="flex-grow">
                            <label htmlFor="city">City</label>
                            <FormControl>
                                <Input disabled={loading} id="city" {...field} />
                            </FormControl>
                            {formState.errors.city && <p className="text-sm text-red-700 italic">
                                {formState.errors.city.message}
                            </p>}
                        </FormItem>
                    }}
                />
            </div>

            <div className="flex gap-3 justify-end">
                <Button 
                    disabled={loading}
                    type="submit"
                    className="cursor-pointer flex items-center gap-2"
                >
                    <SaveIcon className="w-4 h-4"/>
                    <span>{loading ? "Saving..." : "Save"}</span>
                </Button>
            </div>
        </form>
    </Form>
  )
}


