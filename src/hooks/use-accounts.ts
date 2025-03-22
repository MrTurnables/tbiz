import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { idbStorage } from '~/lib/storage';
import { ClientUser } from '~/lib/types';

interface UserAccountsState {
  userAccounts:ClientUser[];
  selectedUserAccount:string|null;
  selectUserAccount:(id:string)=>void;
  setUserAccounts:(outlets:ClientUser[])=>void;
  addUserAccount:(outlet:ClientUser)=>void;
  removeUserAccount:(id:string)=>void;
  editUserAccount:(userAccount:ClientUser)=>void;
}

const useUserAccounts = create<UserAccountsState>()(
  persist(
    (set, get) => ({
      userAccounts: [],
      selectedUserAccount:null,
      selectUserAccount:(id:string)=>set({selectedUserAccount:id}),
      setUserAccounts: (userAccounts:ClientUser[]) => set({ userAccounts }),
      addUserAccount: (userAccount:ClientUser) => {
        const alreadyExists = get().userAccounts.find((usa)=>usa.$id===userAccount.$id);
        if(!alreadyExists){
            return set({
                userAccounts:[...get().userAccounts, userAccount]
            })
        }
      },
      removeUserAccount:(id:string)=>set({
        userAccounts:get().userAccounts.filter((usa)=>usa.$id!==id)
      }),
        editUserAccount:(userAccount:ClientUser)=>set({
            userAccounts:get().userAccounts.map((usa)=>usa.$id===userAccount.$id ? userAccount : usa),
        })
    }),
    { 
      name: 'userAccounts',
      storage: createJSONStorage(() => idbStorage),
    },
  ),
);

export default useUserAccounts;
