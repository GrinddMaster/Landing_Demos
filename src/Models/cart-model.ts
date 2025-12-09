import useCartStore from '@/Stores/cart-store';

export function addCartItem(item) {
  const { addItem } = useCartStore.getState();
  addItem(item);
}
