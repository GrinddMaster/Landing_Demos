import Header from '@/Components/header';
import TitleView from '@/Components/title';
import ReservationView from './ReservationView/reservation-view';
export default function homePage() {
  return (
    <div>
      <Header />
      <TitleView />
      <ReservationView/>
    </div>
  );
}
