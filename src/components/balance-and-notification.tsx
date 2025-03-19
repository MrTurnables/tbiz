import { Wallet } from "lucide-react"
import { Button } from "./ui/button"
import useSettings from "~/hooks/use-settings";
import { formatCurrency } from "~/lib/utils";
import useUser from "~/hooks/use-user";
import { DEFAULT_COUNTRY } from "~/lib/data";

const BalanceAndNotification = () => {
  const { user } = useUser((state)=>state);
  const { currency } = useSettings((state)=>state);

  return (
    <div className="flex items-center justify-end gap-2 flex-wrap">
        <p className="flex items-center gap-1 font-bold text-green-800">
            <Wallet className="w-4 h-4" />
            <span className="text-sm">{formatCurrency(10000,currency,user?.shop.country || DEFAULT_COUNTRY)}</span>
        </p>
        <Button className="cursor-pointer">
            <Wallet />
            <span>Withdraw</span>
        </Button>
    </div>
  )
}

export default BalanceAndNotification