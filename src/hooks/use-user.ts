import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
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
  setUser: (user: AuthUser|null) => void;
  setLocalAuth: (auth: {
    auth:{
      email:string;
      password:string;
    };
    user: AuthUser | null;
  }) => void;
}

const useUser = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        localAuth:null,
        setUser: (user) => set({ user }),
        setLocalAuth: (localAuth) => set({ localAuth }),
      }),
      { 
        name: 'user',
      },
    ),
  )
);

export default useUser;