import { useState } from "react"
import DashboardTitle from "~/components/dashboard-title"
import InventoryForm from "~/components/inventory-form"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { ItemCategory } from "~/lib/types"
import InventoryTable from "./inventory-table"

const Inventory = () => {
  const [tab, setTab] = useState<ItemCategory>(ItemCategory.FINISHED_GOODS)

  return (
    <div className="grow w-full min-h-[92vh] gap-3 p-3 flex flex-col">
      <div className="flex flex-wrap items-center justify-between">
        <div>
            <DashboardTitle 
              title="Inventory"
              subtitle="Manage your inventory." 
            />
        </div>
      </div>
      <Separator />
      <div className="w-full flex flex-col">
        <div className="flex items-center justify-between">
          <div className="w-full flex flex-wrap gap-1">
            <Button
            className="cursor-pointer"
            onClick={()=>setTab(ItemCategory.FINISHED_GOODS)}
            variant={tab===ItemCategory.FINISHED_GOODS ? "default" : "ghost"}>
              Finished Goods
            </Button>
            <Button
            className="cursor-pointer"
            onClick={()=>setTab(ItemCategory.WIP)}
            variant={tab===ItemCategory.WIP ? "default" : "ghost"}>
              Work-in-progress
            </Button>
            <Button
            className="cursor-pointer"
            onClick={()=>setTab(ItemCategory.RAW_MATERIAL)}
            variant={tab===ItemCategory.RAW_MATERIAL ? "default" : "ghost"}>
              Raw Materials
            </Button>
            <Button
            className="cursor-pointer"
            onClick={()=>setTab(ItemCategory.MRO)}
            variant={tab===ItemCategory.MRO ? "default" : "ghost"}>
              MRO
            </Button>
          </div>
          <div className='flex gap-2 items-center justify-end'>
            <Button variant="outline">Export to Excel</Button>
            <Button variant="outline">Import</Button>
            <InventoryForm
            category={tab}
            />
        </div>
        </div>

        <InventoryTable
          activeCategory={tab}
        />
      </div>
    </div>
  )
}

export default Inventory