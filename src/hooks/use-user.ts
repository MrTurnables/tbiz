import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { AuthUser } from '~/lib/types';

interface UserState {
  user: AuthUser | null;
  localAuth: {
    auth:{
      email:string;
      password:string;
    };
    user: AuthUser | null;
  } | null;
  selectedOutlet: string|number|null;
  setUser: (user: AuthUser|null) => void;
  setLocalAuth: (auth: {
    auth:{
      email:string;
      password:string;
    };
    user: AuthUser | null;
  }) => void;
  setSelectedOutlet:(id:string|number|null)=>void;
}

const useUser = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        localAuth:null,
        selectedOutlet:null,
        setUser: (user) => set({ user }),
        setLocalAuth: (localAuth) => set({ localAuth }),
        setSelectedOutlet:(id:string|number|null)=>set({selectedOutlet:id})
      }),
      { name: 'user' },
    ),
  ),
);

export default useUser;