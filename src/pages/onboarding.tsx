import { useEffect, useState, useTransition } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { LoginForm } from "~/components/login-form";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import useUser from "~/hooks/use-user";
import { admin_login } from "~/lib/api_requests";
import { ADMIN_LOGIN_URL } from "~/lib/data";
import { cn } from "~/lib/utils";

const Onboarding = () => {
  const [_, startTransition] = useTransition();
  const [form, setForm] = useState<"login"|"signup"|"shop">("login");
  const [loggingIn, setLoggingIn] = useState(false);

  const { user, setUser } = useUser((state)=>state);
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
          }else if(response.error){
            toast.error("Could not reach server. Check your internet connection and try again");
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

  useEffect(()=>{
    if(user){
      navigate("/dashboard");
    }
  },[user])

  return (
    <div className="w-full flex flex-col py-3 max-w-[450px]">
      <div className="w-full flex items-center">
        <Button
        disabled={true}
        size="lg"
        onClick={()=>setForm("login")}
        variant={form==="login" ? "default" : "outline"}
        className="flex-1 cursor-pointer rounded-b-none">
          Login
        </Button>
      </div>
      <Card className={cn("w-full", form!=="shop" && "rounded-t-none")}>
        <CardHeader className="gap-0.5">
          <CardTitle>🔐 Login</CardTitle>
          <CardDescription>
            Login to your account and manage your business
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm loading={loggingIn} submitLogin={submitLogin} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Onboarding