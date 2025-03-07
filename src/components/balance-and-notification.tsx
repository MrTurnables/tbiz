import { Bell, Wallet } from "lucide-react"
import { Button } from "./ui/button"

const BalanceAndNotification = () => {
  return (
    <div className="flex items-center justify-end gap-2">
        <p className="flex items-center gap-1 font-bold text-green-800">
            <Wallet className="w-4 h-4" />
            <span className="text-sm">$10,000.00</span>
        </p>
        <Button className="cursor-pointer">
            <Wallet />
            <span>Withdraw</span>
        </Button>
        <Button variant="ghost" size="icon" className="relative cursor-pointer rounded-full w-6 h-6">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 right-0 text-xs text-red-800">0</span>
        </Button>
    </div>
  )
}

export default BalanceAndNotification