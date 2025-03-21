import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
      name: 'profile'
    },
  ),
);

export default useProfile;
