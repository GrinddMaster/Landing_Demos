import useCartStore from '@/Stores/cart-store';
import  { cartItem } from '@/types';

export function addCartItem(item: cartItem) {
  const { addItem } = useCartStore.getState();
  addItem(item);
}