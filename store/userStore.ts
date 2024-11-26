import { create } from "zustand";

interface UserState {
    userDetails: Record<string, any> | null;
    setUserDetails: (details: Record<string, any>) => void;
    clearUserDetails: () => void;
}

const useUserStore = create<UserState>((set) => ({
    userDetails: null,
    setUserDetails: (details) => set({ userDetails: details }),
    clearUserDetails: () => set({ userDetails: null }),
}));

export default useUserStore;
