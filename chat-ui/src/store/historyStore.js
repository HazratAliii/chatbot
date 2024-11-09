import { create } from "zustand";

const useStore = create((set) => ({
  convId: "conv_nuyslaruo",
  setConvId: (newConvId) => set(() => ({ convId: newConvId })), // Corrected function to set `convId`
}));

export default useStore;
