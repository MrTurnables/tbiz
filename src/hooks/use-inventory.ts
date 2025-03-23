import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import currency from "currency.js"
import { idbStorage } from '~/lib/storage';
import { CurrentStock, CurrentStockEntry, InventoryEntry, PurchaseEntry, Purchases, SaleEntry, Sales, TrackingInventory, Transaction, TransactionType } from '~/lib/types';
import { getStockStatusKey } from '~/lib/utils';

interface InventoryState {
    inventory:TrackingInventory;
    transactions:Transaction[];
    history:CurrentStock;
    purchases: Purchases;
    sales: Sales;
    selectedInventory:string|null;
    recordTransaction: (transaction:Transaction)=>void;
    recordPurchase: (transaction:PurchaseEntry)=>void;
    recordSale: (sale:SaleEntry)=>void;
    recordHistory: (date:string,record:CurrentStockEntry)=>void;
    setSelectedInventory:(id:string)=>void;
    updateInventory:(entry:InventoryEntry)=>void;
    addInventory:(entry:InventoryEntry)=>void;
    setInventory:(inventory:TrackingInventory)=>void;
    removeInventoryItem:(outletId:string, itemId:string)=>void;
}

const useInventory = create<InventoryState>()(
  devtools(
    persist(
      (set,get) => ({
        inventory: [],
        transactions: [],
        purchases: [],
        sales: [],
        selectedInventory: null,
        history:{},
        recordHistory: (date:string, record:CurrentStockEntry)=>{
            const recordKey = getStockStatusKey(new Date(date));
            const current = get().history[recordKey]
            if(!current){
                set({
                    history:{
                        ...get().history,
                        [recordKey]:[record]
                    } as CurrentStock
                })
            }else{
                const currentRecord = current.find((hrec)=>hrec.itemId===record.itemId && hrec.outletId===record.outletId);
                if(currentRecord){
                    const {openingStock, ...remaining} = record;
                    set({
                        history:{
                            ...get().history,
                            [recordKey]:current.map((entry)=>(entry.itemId===record.itemId)&&(entry.outletId===record.outletId) ? {
                                ...remaining,
                                openingStock:entry.openingStock
                            } : entry)
                        } as CurrentStock
                    });
                }else{
                    set({
                        history:{
                            ...get().history,
                            [recordKey]:[...current,record]
                        } as CurrentStock
                    });
                }
            }
        },
        recordTransaction: (transaction:Transaction)=>set({
            transactions:[...get().transactions, transaction] as Transaction[],
        }),
        recordPurchase: (purchase:PurchaseEntry)=>set({
            purchases:[...get().purchases, purchase] as Purchases,
        }),
        recordSale: (sale:SaleEntry)=>set({
            sales:[...get().sales, sale] as Sales,
        }),
        setInventory: (inventory:TrackingInventory)=> set({
            inventory
        }),
        setSelectedInventory:(id:string)=>set({selectedInventory:id}),
        updateInventory:(entry:InventoryEntry)=>{
            return set({
                inventory:get().inventory.map((inv)=>(inv.id===entry.id)&&(inv.outletId===entry.outletId) ? entry : inv) as TrackingInventory
            });
        },
        // Add new inventory or update inventory
        // Adds quantity to previous quantity
        // Use -ve to remove items from inventory (e.g: sales)
        addInventory:(entry:InventoryEntry, transactionType=TransactionType.PURCHASE)=>{
            const item = get().inventory.find((inv)=>(inv.id===entry.id)&&(inv.outletId===entry.outletId))
            const transactionId = uuidv4();
            const amt = currency(currency(entry.pricePerUnit).multiply(Math.abs(entry.units))).toString();
            if(!item){
                const updatedInventory = [...get().inventory, entry] as TrackingInventory;
                set({
                    inventory:updatedInventory,
                });

               const currentStockEntry = {
                   id:uuidv4(),
                   itemId:entry.id,
                   outletId:entry.outletId,
                   sku:entry.sku,
                   itemName:entry.name,
                   pricePerUnit:entry.pricePerUnit,
                   openingStock:entry.units,
                   purchases:entry.units,
                   sales:0,
                   closingStock:entry.units,
                   totalStockValue:amt,
                   recordedAt:new Date().toISOString(),
                   createdAt:entry.createdAt,
                   updatedAt:entry.updatedAt
               } as CurrentStockEntry;

                // Add entry to history
                get().recordHistory(entry.createdAt, currentStockEntry);

                // Record transaction as initial_stock
                get().recordTransaction({
                    id:transactionId,
                    fromLocationId:entry.outletId,
                    type:TransactionType.INITIAL_STOCK,
                    itemId:entry.id,
                    quantity:entry.units,
                    price:amt,
                    toLocationId:null,
                    transactionDate:entry.createdAt,
                    createdAt:new Date().toISOString(),
                    updatedAt:new Date().toISOString(),
                    notes:entry.description,
                });
                console.log("Transaction recorded:", {transactionId});

                // record purchases
                get().recordPurchase({
                    id:uuidv4(),
                    transactionId,
                    outletId:entry.outletId,
                    itemId:entry.id,
                    itemName:entry.name,
                    date:entry.createdAt,
                    supplierId:entry.supplerId,
                    totalStockValue:amt,
                    units:Math.abs(entry.units),
                    createdAt:new Date().toISOString(),
                    pricePerUnit:entry.pricePerUnit,
                    sku:entry.sku,
                    updatedAt:entry.createdAt,
                    notes:entry.description
                });
                console.log("Purchase recorded:", {transactionId});

            }else{
                set({
                    inventory:get().inventory.map((inv)=>(inv.id===item.id)&&(inv.outletId===item.outletId) ? {
                        ...item,
                        units:inv.units + item.units
                    } : inv),
                });

                const currentInv = get().inventory.find((inv)=>(inv.id===item.id)&&(inv.outletId===item.outletId));
                if(currentInv){
                    const currentStockEntry = {
                        id:uuidv4(),
                        itemId:entry.id,
                        outletId:entry.outletId,
                        sku:entry.sku,
                        itemName:entry.name,
                        pricePerUnit:entry.pricePerUnit,
                        openingStock:0,
                        purchases:transactionType!==TransactionType.SALE ? entry.units : 0,
                        sales:transactionType===TransactionType.SALE ? entry.units : 0,
                        closingStock:currentInv.units,
                        totalStockValue:amt,
                        recordedAt:new Date().toISOString(),
                        createdAt:entry.createdAt,
                        updatedAt:entry.updatedAt
                    } as CurrentStockEntry;
                    
                    get().recordHistory(entry.createdAt, currentStockEntry);
                }
 
                 // Add entry to history

                // Record transaction as specfied transaction type
                get().recordTransaction({
                    id:transactionId,
                    fromLocationId:entry.outletId,
                    type:transactionType,
                    itemId:entry.id,
                    quantity:entry.units,
                    price:amt,
                    toLocationId:null,
                    transactionDate:entry.createdAt,
                    createdAt:new Date().toISOString(),
                    updatedAt:new Date().toISOString(),
                    notes:entry.description,
                });
                console.log("Transaction recorded:", {transactionId});

                // If sale, record sale, else record purchases
                if(transactionType===TransactionType.SALE){
                    // Record sale
                    get().recordSale({
                        id:uuidv4(),
                        transactionId,
                        invoiceId:`${entry.invoiceId}`,
                        customerId:entry.customerId,
                        itemId:entry.id,
                        date:entry.createdAt,
                        itemName:entry.name,
                        sku:entry.sku,
                        units:Math.abs(entry.units),
                        outletId:entry.outletId,
                        totalStockValue:amt,
                        updatedAt:entry.createdAt,
                        createdAt:entry.createdAt,
                        pricePerUnit:entry.pricePerUnit,
                        notes:entry.description
                    });
                    console.log("Sale recorded:", {transactionId});
                }else{
                    get().recordPurchase({
                        id:uuidv4(),
                        transactionId,
                        outletId:entry.outletId,
                        itemId:entry.id,
                        itemName:entry.name,
                        date:entry.createdAt,
                        supplierId:entry.supplerId,
                        totalStockValue:amt,
                        units:Math.abs(entry.units),
                        createdAt:new Date().toISOString(),
                        pricePerUnit:entry.pricePerUnit,
                        sku:entry.sku,
                        updatedAt:entry.createdAt,
                        notes:entry.description
                    });
                    console.log("Purchase recorded:", {transactionId});
                }
            }
        },
        removeInventoryItem:(outletId:string, itemId:string)=>set({
            inventory:get().inventory.filter((inv)=>((inv.id!==itemId) && (inv.outletId!==outletId))) as TrackingInventory
        })
      }),
      { 
        name: 'inventory',
        storage: createJSONStorage(() => idbStorage),
      },
    ),
  ),
);

export default useInventory;