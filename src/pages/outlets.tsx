import AddShopOutletForm from "~/components/add-shop-outlet-form"
import DashboardTitle from "~/components/dashboard-title"
import ShopOutletCard from "~/components/shop-outlet-card"
import { Separator } from "~/components/ui/separator"
import useUser from "~/hooks/use-user"

const Outlets = () => {
    const {user} = useUser((state)=>state);
    console.log({shop:user?.shop});
  return (
    <div className="grow w-full min-h-[92vh] gap-3 p-3 flex flex-col">
        <div className="flex flex-wrap items-center justify-between">
            <div><DashboardTitle title={`Outlets (${user?.shop.outlets.length})`} subtitle="" /></div>
            <AddShopOutletForm 
            shop={user?.shop || null}
            initial={{
                name:user?.shop.name || "",
                address:user?.shop.address,
                city:user?.shop.city,
                country:user?.shop.country
            }} />
        </div>
        <Separator />
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {user?.shop.outlets && user.shop.outlets.length > 0 ? user.shop.outlets.map((outlet)=><ShopOutletCard key={outlet.$id}
                outlet={outlet}
            />) : <div className="md:col-span-3 sm:col-span-2 flex flex-col items-center justify-center py-8">
                <h4 className="text-lg font-semibold italic text-center text-gray-500">No outlets to display</h4>
            </div>}
        </div>
    </div>
  )
}

export default Outlets