import DashboardTitle from "~/components/dashboard-title"
import { Separator } from "~/components/ui/separator"

const InvoicesPage = () => {
  return (
    <div className="grow w-full min-h-[92vh] gap-3 p-3 flex flex-col">
        <div className="flex flex-wrap items-center justify-between">
            <div>
                <DashboardTitle
                    title="Invoices"
                    subtitle="Manage invoices" 
                />
            </div>
            {/* <AddUserForm
                shopId={user?.shopId || ""}
                userId={user?.$id || ""}
                initial={{
                    name:"",
                    address:"",
                    city:"",
                    country:""
                }}
            /> */}
        </div>
        <Separator />
        <div>
            <h1>Content</h1>
        </div>
    </div>
  )
}

export default InvoicesPage