import { create } from 'zustand';

type SubscriptionModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useSubscriptionModal = create<SubscriptionModalStore>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSubscriptionModal;
