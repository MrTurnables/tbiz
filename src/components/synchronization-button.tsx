import { RefreshCw } from "lucide-react"
import { useInternetSync } from "~/hooks/use-internet-sync"
import { runSynchronization } from "~/lib/synchronization_queues"
import { cn } from "~/lib/utils"
import { Button } from "./ui/button"

const SynchronizationButton = () => {
    const {loading:syncing} = useInternetSync(runSynchronization)

  return (
    <Button
    disabled={true}
    variant="ghost"
    size="icon" className="cursor-pointer">
        <RefreshCw className={cn(
            "w-4 h-4",
            syncing ? "syncing-animation" : ""
        )} />
    </Button>
  )
}

export default SynchronizationButton