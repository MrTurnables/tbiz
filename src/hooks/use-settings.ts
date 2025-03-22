import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { idbStorage } from '~/lib/storage';

interface SettingsState {
    currency:string;
    setCurrency:(currency:string)=>void;
}

const useSettings = create<SettingsState>()(
  devtools(
    persist(
      (set) => ({
        currency:"GHC",
        setCurrency: (currency) => set({ currency }),
      }),
      { 
        name: 'settings',
        storage: createJSONStorage(() => idbStorage),
      },
    ),
  ),
);

export default useSettings;