import Header from '@/Components/header';
import TitleView from '@/Components/title';
import CartView from './CartView/cart-view';
import ChatView from './ChatView/chat-view';
import LiveStreamView from './LiveStreamView/live-stream';
import ReservationView from './ReservationView/reservation-view';
export default function homePage() {
  return (
    <div>
      <Header />
      <LiveStreamView/>
    </div>
  );
}
