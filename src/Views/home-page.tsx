import Header from '@/Components/header';
import TitleView from '@/Components/title';
import CartView from './CartView/cart-view';
export default function homePage() {
  return (
    <div>
      <Header />
      <TitleView />
      <CartView/>
    </div>
  );
}
