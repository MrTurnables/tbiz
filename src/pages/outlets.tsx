import { useState } from "react"
import AddShopOutletForm from "~/components/add-shop-outlet-form"
import DashboardTitle from "~/components/dashboard-title"
import ShopOutletCard from "~/components/shop-outlet-card"
import ShopOutletInfoCard from "~/components/shop-outlet-info-card"
import { Separator } from "~/components/ui/separator"
import useUser from "~/hooks/use-user"

const Outlets = () => {
    const [selectedOutlet, setSelectedOutlet] = useState<string|number|null>(null);
    const {user} = useUser((state)=>state);

    const selectOutlet = (id:string|number) => {
        if(id===selectedOutlet){
            setSelectedOutlet(null);
        }else{
            setSelectedOutlet(id);
        }
    }
  return (
    <div className="grow w-full h-full min-h-[92vh] gap-3 p-3 flex flex-col">
        <div className="flex flex-wrap items-center justify-between">
            <div>
                <DashboardTitle 
                    title={`Outlets (${user?.shop.outlets.length})`} 
                    subtitle="Set up different outlets or locations for your business." 
                />
            </div>
            <AddShopOutletForm
                shop={user?.shop || null}
                initial={{
                    name:user?.shop.name || "",
                    address:user?.shop.address,
                    city:user?.shop.city,
                    country:user?.shop.country
                }}
            />
        </div>
        <Separator />
        <div className="w-full flex gap-2">
            <div className="flex-grow grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
                {user?.shop.outlets && user.shop.outlets.length > 0 ? user.shop.outlets.map((outlet)=><ShopOutletCard 
                    key={outlet.$id}
                    outlet={outlet}
                    selectOutlet={selectOutlet}
                    selectedOutlet={selectedOutlet}
                />) :
                <div className="md:col-span-3 sm:col-span-2 flex flex-col items-center justify-center py-8">
                    <h4 className="text-lg font-semibold italic text-center text-gray-500">No outlets to display</h4>
                </div>}
            </div>

            {selectedOutlet && <div className="w-[250px] h-full">
                <ShopOutletInfoCard 
                    outlet={user?.shop.outlets ? user?.shop.outlets.find((otl)=>otl.$id===selectedOutlet) : null}
                />
            </div>}
        </div>
    </div>
  )
}

export default Outlets