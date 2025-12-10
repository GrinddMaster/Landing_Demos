import { cartItem, cartState } from '@/types';
import { create } from 'zustand';

const useCartStore = create<cartState>((set) => ({
  cartItems: [],
  addItem: (item : cartItem) =>
    set((state : cartState) => ({
      cartItems: [...state.cartItems, item],
    })),
  clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;