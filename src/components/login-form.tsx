"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginFormSchema } from "~/lib/schema"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { LogInIcon } from "lucide-react"

export const LoginForm = ({loading, submitLogin}:{loading:boolean, submitLogin:(values:{email:string;password:string})=>void}) => {
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            loginEmail: "",
            password: "",
        },
    });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const {loginEmail, ...rest} = values;
    submitLogin({
        ...rest,
        email:loginEmail
    });
  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                control={form.control}
                name="loginEmail"
                render={({ field, formState }) => {
                    return <FormItem>
                        <label htmlFor="login-email">E-mail</label>
                        <FormControl>
                            <Input 
                                type="email" 
                                disabled={loading} 
                                id="login-email" 
                                placeholder="name@site.com" 
                                {...field} 
                            />
                        </FormControl>
                        {formState.errors.loginEmail && <p className="text-sm text-red-700 italic">
                            {formState.errors.loginEmail.message}
                        </p>}
                    </FormItem>
                }}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field, formState }) => (
                    <FormItem>
                        <label htmlFor="login-password">Password</label>
                        <FormControl>
                            <Input disabled={loading} id="login-password" type="password" placeholder="******" {...field} />
                        </FormControl>
                        {formState.errors.password && <p className="text-sm text-red-700 italic">
                            {formState.errors.password.message}
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
                <span>{loading ? "Signing in..." : "Sign in"}</span>
            </Button>
        </form>
    </Form>
  )
}


