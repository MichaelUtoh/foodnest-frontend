import { create } from 'zustand'

interface SidebarState {
    selected: string;
    setSelected: (name: string) => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
    selected: "Home",
    setSelected: (name) => set({ selected: name }),
}));

export default useSidebarStore;