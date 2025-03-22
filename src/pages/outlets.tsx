import AddShopOutletForm from "~/components/add-shop-outlet-form"
import DashboardTitle from "~/components/dashboard-title"
import ShopOutletCard from "~/components/shop-outlet-card"
import { Separator } from "~/components/ui/separator"
import useOutlets from "~/hooks/use-outlets"
import useUser from "~/hooks/use-user"

const Outlets = () => {
    const {user} = useUser((state)=>state);
    const { outlets } = useOutlets((state)=>state);

    console.log({user});

  return (
    <div className="grow w-full h-full min-h-[92vh] gap-3 p-3 flex flex-col">
        <div className="flex flex-wrap items-center justify-between">
            <div>
                <DashboardTitle 
                    title={`Outlets (${outlets.length})`} 
                    subtitle="Set up different outlets or locations for your business." 
                />
            </div>
            <AddShopOutletForm
                shopId={user?.shopId || ""}
                userId={user?.$id || ""}
                initial={{
                    name:"",
                    address:"",
                    city:"",
                    country:""
                }}
            />
        </div>
        <Separator />
        <div className="w-full flex gap-2">
            <div className="flex-grow grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
                {outlets.length > 0 ? outlets.map((outlet)=><ShopOutletCard 
                    key={outlet.$id}
                    outlet={outlet}
                />) :
                <div className="md:col-span-3 sm:col-span-2 flex flex-col items-center justify-center py-8">
                    <h4 className="text-lg font-semibold italic text-center text-gray-500">No outlets to display</h4>
                </div>}
            </div>
        </div>
    </div>
  )
}

export default Outlets