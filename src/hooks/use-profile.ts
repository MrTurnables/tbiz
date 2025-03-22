import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { idbStorage } from '~/lib/storage';
import { BusinessProfileFormType } from '~/lib/types';

interface ProfileState {
  profile:BusinessProfileFormType | null;
  setProfile:(profile:BusinessProfileFormType)=>void
}

const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile:BusinessProfileFormType) => set({ profile }),
    }),
    { 
      name: 'profile',
      storage: createJSONStorage(() => idbStorage),
    },
  ),
);

export default useProfile;
