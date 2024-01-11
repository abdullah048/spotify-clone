import { create } from 'zustand';

type UploadModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useUploadModalStore = create<UploadModalStore>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUploadModalStore;
