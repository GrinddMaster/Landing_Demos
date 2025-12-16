import Cart from '@/Components/CartComponents/Cart';
import Reservation from '@/Components/ReservationComponets/Reservation';
import TourView from '@/Components/TourComponents/Tour';
export default function cartView() {
  const key = import.meta.env.VITE_SDK_KEY;
  const Id = import.meta.env.VITE_SPACE_ID;
  return (
    <section>
      <div className="flex items-center flex-col">
        <h2>Reservation Demo</h2>
      </div>
      <div className="items-center">
        <TourView sdkKey={key} spaceId={Id} />
      </div>
      <div className='flex items-center flex-col'>
        <Reservation/>
      </div>
    </section>
  );
}
