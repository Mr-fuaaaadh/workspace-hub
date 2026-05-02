import type { ActiveTab } from "@/types";
import { create } from "zustand";

interface UIStore {
  activeGroupId: string | null;
  activeTab: ActiveTab;
  sidebarOpen: boolean;
  rightPanelOpen: boolean;
  setActiveGroupId: (id: string | null) => void;
  setActiveTab: (tab: ActiveTab) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setRightPanelOpen: (open: boolean) => void;
  toggleRightPanel: () => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  activeGroupId: null,
  activeTab: "all",
  sidebarOpen: false,
  rightPanelOpen: true,

  setActiveGroupId: (id) => set({ activeGroupId: id }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setRightPanelOpen: (open) => set({ rightPanelOpen: open }),
  toggleRightPanel: () => set((s) => ({ rightPanelOpen: !s.rightPanelOpen })),
}));
