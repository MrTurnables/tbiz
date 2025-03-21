import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import useUser from "~/hooks/use-user";

const AuthLayout = () => {
  const {user} = useUser((state)=>state);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user) {
      navigate("/dashboard");
    }
  },[user]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-600">
        <Outlet />
    </div>
  )
}

export default AuthLayout