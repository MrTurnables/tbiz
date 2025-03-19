import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface SettingsState {
    enableOffline:boolean;
    currency:string;
    setEnableOffline:(flag:boolean)=>void;
    setCurrency:(currency:string)=>void;
}

const useSettings = create<SettingsState>()(
  devtools(
    persist(
      (set) => ({
        enableOffline: false,
        currency:"GHS",
        setEnableOffline: (enableOffline) => set({ enableOffline }),
        setCurrency: (currency) => set({ currency }),
      }),
      { name: 'user' },
    ),
  ),
);

export default useSettings;