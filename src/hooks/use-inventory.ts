import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { InventoryEntryType, InventoryType } from '~/lib/types';

interface InventoryState {
    inventory:InventoryType;
    selectedInventory:string|null;
    setSelectedInventory:(id:string)=>void;
    updateInventory:(outletId:string, itemId:string, data:Record<string, string|number>)=>boolean;
    setInventory:(outletId:string, entry:InventoryEntryType[])=>void;
    removeInventoryItem:(outletId:string, itemId:string)=>void;
}

const useInventory = create<InventoryState>()(
  devtools(
    persist(
      (set,get) => ({
        inventory: {},
        selectedInventory:null,
        setInventory:(outletId:string, entry:InventoryEntryType[])=> set({
            inventory:{...get().inventory, [outletId]:entry}
        }),
        setSelectedInventory:(id:string)=>set({selectedInventory:id}),
        updateInventory:(outletId:string, itemId:string, data:Record<string, string|number>)=>{
            const item = get().inventory[outletId].find((inv)=>inv.itemId===itemId && inv.outletId===outletId)
            if(item){
                const updatedItem = {...item, ...data} as InventoryEntryType;
                const newInventoryItems = get().inventory[outletId].map((itm)=>{
                    if(itm.itemId===updatedItem.itemId && itm.outletId===updatedItem.outletId){
                        return updatedItem
                    }else{
                        return itm
                    }
                });
                set({
                    inventory:{...get().inventory, [outletId]:newInventoryItems}
                });
                return true
            }
            return false;
        },
        removeInventoryItem:(outletId:string, itemId:string)=>set({
            inventory:{
                ...get().inventory, 
                [outletId]:get().inventory[outletId].filter((inv)=>((inv.itemId!==itemId) && (inv.outletId!==outletId)))
            }
        })
      }),
      { name: 'inventory' },
    ),
  ),
);

export default useInventory;