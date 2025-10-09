import { create } from "zustand";

const useUserStore = create(set => ({
  tipo: null, // As informações decodificadas do token
  info: null, // O token JWT completo
  setMe: (tipo, info) => set({ tipo, info }),
  logout: () => set({ tipo: null, info: null }),
}))

export default useUserStore;