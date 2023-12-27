import { create } from 'zustand';

type AuthModalStore = {
  isOpen: boolean;
  view: 'sign_up' | 'sign_in';
  onOpen: (currentView: 'sign_up' | 'sign_in') => void;
  onClose: () => void;
};

const useAuthModalStore = create<AuthModalStore>((set, get) => ({
  isOpen: false,
  view: 'sign_in',
  onOpen: currentView => set({ isOpen: true, view: currentView }),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModalStore;
