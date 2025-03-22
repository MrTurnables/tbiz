import AddClientUserForm from "~/components/add-client-user-form"
import DashboardTitle from "~/components/dashboard-title"
import { DataTable } from "~/components/data-table"
import { Separator } from "~/components/ui/separator"
import useUserAccounts from "~/hooks/use-accounts"
import useUser from "~/hooks/use-user"
import { userAccountsColumns } from "~/lib/component-data"

const UsersPage = () => {
    const {user} = useUser((state)=>state);
    const {userAccounts} = useUserAccounts((state)=>state);

  return (
    <div className="grow w-full min-h-[92vh] gap-3 p-3 flex flex-col">
        <div className="flex flex-wrap items-center justify-between">
            <div>
                <DashboardTitle
                    title="Users"
                    subtitle="Manage users." 
                />
            </div>
            {user && <AddClientUserForm
                shopId={user.shopId}
                initial={{
                    fullName:"",
                    email:"",
                    phoneNumber:""
                }}
            />}
        </div>
        <Separator />
        <div className="grow">
            <DataTable columns={userAccountsColumns} data={userAccounts} filterColumn="fullName" />
        </div>
    </div>
  )
}

export default UsersPage