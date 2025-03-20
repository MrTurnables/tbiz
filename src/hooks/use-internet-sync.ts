import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useInternetSync(syncFunction: () => Promise<boolean>) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let hasRun = false;

        function checkConnection() {
            console.log("Checking...");
            if (navigator.onLine && !hasRun) {
                setLoading(true);
                hasRun = true;
                syncFunction().then((v)=>{
                    if(v){
                        toast.success("Data synchronized successfully!");
                    }
                }).finally(()=>{
                    setLoading(false);
                });
            } else if (!navigator.onLine) {
                setLoading(false);
                hasRun = false; // Reset when offline to allow running again when back online
            }
        }

        window.addEventListener("online", checkConnection);
        window.addEventListener("offline", checkConnection);

        // Initial check
        checkConnection();

        return () => {
            window.removeEventListener("online", checkConnection);
            window.removeEventListener("offline", checkConnection);
        };
    }, [syncFunction]);

    return {
        loading
    }
}
