import useCartStore from '../stores/cartStore';

export function addCartItem(item) {
  const { addItem } = useCartStore.getState();
  addItem(item);
}
