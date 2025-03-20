import DashboardTitle from "~/components/dashboard-title"
import { Separator } from "~/components/ui/separator"

const Inventory = () => {
  return (
    <div className="grow w-full h-full min-h-[92vh] gap-3 p-3 flex flex-col">
      <div className="flex flex-wrap items-center justify-between">
        <div>
            <DashboardTitle 
                title="Inventory"
                subtitle="Manage your inventory." 
            />
        </div>
      </div>
      <Separator />
      <div className="w-full flex gap-2">
        <h5>Main section</h5>
      </div>
    </div>
  )
}

export default Inventory