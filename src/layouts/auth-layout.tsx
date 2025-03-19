import { Navigate, Outlet } from "react-router";
import useUser from "~/hooks/use-user";

const AuthLayout = () => {
  const {user} = useUser((state)=>state);

  if(user && user.shop.name) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-600">
        <Outlet />
    </div>
  )
}

export default AuthLayout