import { useEffect, useState, useTransition } from "react";
import { useNavigate } from "react-router";
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
  const [loggingIn, setLoggingIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [savingShoppingDetails, setSavingShoppingDetails] = useState(false);

  const { user, localAuth, setUser, setLocalAuth } = useUser((state)=>state);
  const navigate = useNavigate();

  const submitLogin = (data:{email:string;password:string}) => {
    setLoggingIn(true);
    startTransition(()=>{
      const url = ADMIN_LOGIN_URL;
      admin_login(url, data.email, data.password)
        .then((response)=>{
          if(response.success){
            toast.success("Sign in successful");
            setUser(response.data);
            setLocalAuth({
              auth:data,
              user:response.data
            })
          }else if(response.error){
            toast.error("Could not reach server. Attempting local login...");
            if(localAuth && localAuth.auth.email===data.email && localAuth.auth.password===data.password){
              setUser(localAuth.user);
              toast.success("Logged in using previous session. Data may not be up-to-date");
            }else{
              toast.error("User not found. Register an account to continue");
            }
          }
        })
        .catch((error)=>{
          console.log("Login failed", error);
          toast.error("Something went wrong");
        }).finally(()=>{
          setLoggingIn(false);
        })
    })
  }

  const submitRegister = (data:{
    fullName:string;
    phoneNumber:string;
    email:string;
    password:string
  }) => {
    setSigningUp(true);
    startTransition(()=>{
      const url = ADMIN_URL;
      admin_register(url, data)
        .then((response)=>{
          if(response.success){
            toast.success(response.message);
            setUser(response.data);
            setLocalAuth({
              auth:{email:data.email,password:data.password},
              user:response.data
            });
          }else{
            toast.error(response.message);
          }
        })
        .catch((error)=>{
          console.log(error);
          toast.error("Something went wrong");
        }).finally(()=>{
          setSigningUp(false);
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
    setSavingShoppingDetails(true);
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
              
              if(localAuth){
                setLocalAuth({
                  auth:localAuth.auth,
                  user:updatedUser
                });
              }
              navigate("/dashboard");
            }
          }else{
            toast.error(response.message);
          }
        })
        .catch((error)=>{
          console.log(error);
          toast.error("Something went wrong");
        }).finally(()=>{
          setSavingShoppingDetails(false);
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
        disabled={isPending}
        size="lg"
        onClick={()=>setForm("login")}
        variant={form==="login" ? "default" : "outline"}
        className="flex-1 cursor-pointer rounded-b-none rounded-tr-none">
          Login
        </Button>

        <Button
        disabled={isPending}
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
          {form==="login" && <LoginForm loading={loggingIn} submitLogin={submitLogin} />}
          {form==="signup" && <RegisterForm loading={signingUp} submitRegister={submitRegister} />}
          {form==="shop" && <ShopForm loading={savingShoppingDetails} submitShopForm={submitShopForm} />}
        </CardContent>
      </Card>
    </div>
  )
}

export default Onboarding