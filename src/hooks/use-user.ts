import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { AuthUser } from '~/lib/types';

interface UserState {
  user: AuthUser | null;
  setUser: (user: AuthUser|null) => void;
}

const useUser = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
      }),
      { name: 'user' },
    ),
  ),
);

export default useUser;