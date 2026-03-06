import { create } from "zustand";

interface UIState {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  activeModal: string | null;
  notifications: Notification[];
  toggleSidebar: () => void;
  setDarkMode: (isDark: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  addNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: string) => void;
}

interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
}

export const useUIStore = create<UIState>()((set) => ({
  isSidebarCollapsed: false,
  isDarkMode: true,
  activeModal: null,
  notifications: [],
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setDarkMode: (isDarkMode) => set({ isDarkMode }),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: Math.random().toString(36).substring(7) },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
