import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { idbStorage } from '~/lib/storage';
import { ShopOutlet } from '~/lib/types';

interface OutletsState {
  outlets:ShopOutlet[] | [];
  selectedOutlet:string|null;
  selectOutlet:(id:string)=>void;
  setOutlets:(outlets:ShopOutlet[])=>void;
  addOutlet:(outlet:ShopOutlet)=>void;
  removeOutlet:(id:string)=>void;
  editOutlet:(outlet:ShopOutlet)=>void;
}

const useOutlets = create<OutletsState>()(
  persist(
    (set, get) => ({
      outlets: [],
      selectedOutlet:null,
      selectOutlet:(id:string)=>set({selectedOutlet:id}),
      setOutlets: (outlets:ShopOutlet[]) => set({ outlets }),
      addOutlet: (outlet:ShopOutlet) => {
        const alreadyExists = get().outlets.find((otl)=>otl.$id===outlet.$id);
        if(!alreadyExists){
            return set({
                outlets:[...get().outlets, outlet]
            })
        }
      },
      removeOutlet:(id:string)=>set({
        outlets:get().outlets.filter((otl)=>otl.$id!==id)
      }),
        editOutlet:(outlet:ShopOutlet)=>set({
            outlets:get().outlets.map((otl)=>otl.$id===outlet.$id ? outlet : otl),
        })
    }),
    { 
      name: 'outlets',
      storage: createJSONStorage(() => idbStorage),
    },
  ),
);

export default useOutlets;
