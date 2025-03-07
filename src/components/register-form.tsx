"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signupFormSchema } from "~/lib/schema"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { LogInIcon } from "lucide-react"

export const RegisterForm = ({
    loading, 
    submitRegister
}:{
    loading:boolean, 
    submitRegister:(values:{
        email:string;
        password:string;
        fullName:string;
        phoneNumber:string;
    })=>void
}) => {
    const form = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            email: "",
            password: "",
            fullName: "",
            phoneNumber: "",
        },
    });

  function onSubmit(values: z.infer<typeof signupFormSchema>) {
    submitRegister(values);
  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                control={form.control}
                name="fullName"
                render={({ field, formState }) => {
                    return <FormItem>
                        <label htmlFor="register-fullname">Full name</label>
                        <FormControl>
                            <Input disabled={loading} id="register-fullname" {...field} />
                        </FormControl>
                        {formState.errors.fullName && <p className="text-sm text-red-700 italic">
                            {formState.errors.fullName.message}
                        </p>}
                    </FormItem>
                }}
            />
            <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field, formState }) => {
                    return <FormItem>
                        <label htmlFor="register-phoneNumber">Phone Number</label>
                        <FormControl>
                            <Input disabled={loading} id="register-phoneNumber" {...field} />
                        </FormControl>
                        {formState.errors.phoneNumber && <p className="text-sm text-red-700 italic">
                            {formState.errors.phoneNumber.message}
                        </p>}
                    </FormItem>
                }}
            />
            <FormField
                control={form.control}
                name="email"
                render={({ field, formState }) => {
                    return <FormItem>
                        <label htmlFor="register-email">E-mail</label>
                        <FormControl>
                            <Input disabled={loading} id="register-email" placeholder="name@site.com" {...field} />
                        </FormControl>
                        {formState.errors.email && <p className="text-sm text-red-700 italic">
                            {formState.errors.email.message}
                        </p>}
                    </FormItem>
                }}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field, formState }) => (
                    <FormItem>
                        <label htmlFor="register-password">Password</label>
                        <FormControl>
                            <Input disabled={loading} id="register-password" type="password" placeholder="******" {...field} />
                        </FormControl>
                        {formState.errors.password && <p className="text-sm text-red-700 italic">
                            {formState.errors.password.message}
                        </p>}
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field, formState }) => (
                    <FormItem>
                        <label htmlFor="register-confirm-password">Confirm Password</label>
                        <FormControl>
                            <Input disabled={loading} id="register-confirm-password" placeholder="******" type="password" {...field} />
                        </FormControl>
                        {formState.errors.confirmPassword && <p className="text-sm text-red-700 italic">
                            {formState.errors.confirmPassword.message}
                        </p>}
                    </FormItem>
                )}
            />
            <Button 
                disabled={loading}
                type="submit"
                className="cursor-pointer flex items-center gap-2"
            >
                <LogInIcon className="w-4 h-4"/>
                <span>{loading ? "Signing up..." : "Sign up"}</span>
            </Button>
        </form>
    </Form>
  )
}


