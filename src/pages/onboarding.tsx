import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { LoginForm } from "~/components/login-form";
import { RegisterForm } from "~/components/register-form";
import { ShopForm } from "~/components/shop-form";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import useUser from "~/hooks/use-user";
import { admin_login, admin_register, admin_shop_update } from "~/lib/api_requests";
import { ADMIN_LOGIN_URL, ADMIN_URL, SHOP_URL } from "~/lib/data";
import { ShopType } from "~/lib/types";
import { cn } from "~/lib/utils";

const Onboarding = () => {
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<"login"|"signup"|"shop">("login");

  const { user, setUser } = useUser((state)=>state);

  const submitLogin = (data:{email:string;password:string}) => {
    startTransition(()=>{
      const url = ADMIN_LOGIN_URL;
      admin_login(url, data.email, data.password)
        .then((response)=>{
          if(response.success){
            toast.success("Sign in successful");
            setUser(response.data);
          }else{
            toast.error(response.message);
          }
        })
        .catch((error)=>{
          console.log(error);
          toast.error("Something went wrong");
        });
    })
  }

  const submitRegister = (data:{
    fullName:string;
    phoneNumber:string;
    email:string;
    password:string
  }) => {
    startTransition(()=>{
      const url = ADMIN_URL;
      admin_register(url, data)
        .then((response)=>{
          if(response.success){
            toast.success(response.message);
            setUser(response.data);
          }else{
            toast.error(response.message);
          }
        })
        .catch((error)=>{
          console.log(error);
          toast.error("Something went wrong");
        });
    })
  }

  const submitShopForm = (data:{
    name:string;
    type:ShopType;
    description?:string;
    address?:string;
    website?:string;
    city?:string;
    country?:string;
    imageUrl?:string;
}) => {
    startTransition(()=>{
      const url = SHOP_URL;
      admin_shop_update(url, user?.$id || "", user?.shop.$id || "", data)
        .then((response)=>{
          if(response.success){
            toast.success(response.message);
            const updatedUser = user;
            if(updatedUser){
              updatedUser.shop = response.data;
              setUser(updatedUser);
            }
          }else{
            toast.error(response.message);
          }
        })
        .catch((error)=>{
          console.log(error);
          toast.error("Something went wrong");
        });
    });
  }

  useEffect(()=>{
    if(user && (!user.shop.name || !user.shop.type)){
      setForm("shop");
    }else{
      setForm("login");
    }
  },[user])

  return (
    <div className={cn(
      "w-full flex flex-col py-3",
      form!=="shop" ? "max-w-[450px]" : "max-w-[768px]"
      )}>
      {form !== "shop" && <div className="w-full flex items-center">
        <Button
        size="lg"
        onClick={()=>setForm("login")}
        variant={form==="login" ? "default" : "outline"}
        className="flex-1 cursor-pointer rounded-b-none rounded-tr-none">
          Login
        </Button>

        <Button
        size="lg"
        onClick={()=>setForm("signup")}
        variant={form==="signup" ? "default" : "outline"}
        className="flex-1 cursor-pointer rounded-b-none rounded-tl-none">
          Register
        </Button>
      </div>}
      <Card className={cn("w-full", form!=="shop" && "rounded-t-none")}>
        <CardHeader className="gap-0.5">
          <CardTitle>{
            form==="login" ? "🔐 Login" : 
            form==="signup" ? "🔐 Register" : 
            form==="shop" ? "Set up your business profile" : null
          }</CardTitle>
          <CardDescription>
            {form==="login" ? 
            "Login to your account and manage your business" :  null}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {form==="login" && <LoginForm loading={isPending} submitLogin={submitLogin} />}
          {form==="signup" && <RegisterForm loading={isPending} submitRegister={submitRegister} />}
          {form==="shop" && <ShopForm loading={isPending} submitShopForm={submitShopForm} />}
        </CardContent>
      </Card>
    </div>
  )
}

export default Onboarding