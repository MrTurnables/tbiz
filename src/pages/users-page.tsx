import { PlusIcon } from "lucide-react"
import DashboardTitle from "~/components/dashboard-title"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"

const UsersPage = () => {
  return (
    <div className="grow w-full min-h-[92vh] gap-3 p-3 flex flex-col">
        <div className="flex flex-wrap items-center justify-between">
            <div>
                <DashboardTitle
                    title="Users"
                    subtitle="Manage users." 
                />
            </div>
            <Button className="flex items-center gap-2">
                <PlusIcon className="w-4 h-4"/>
                <span>Add User</span>
            </Button>
        </div>
        <Separator />
        <div>
            <h1>Content</h1>
        </div>
    </div>
  )
}

export default UsersPage