import Reservation from '@/Components/ReservationComponets/Reservation';
import TourView from '@/Components/TourComponents/Tour';
export default function cartView() {
  const key = import.meta.env.VITE_SDK_KEY;
  const Id = import.meta.env.VITE_CAV_SPACE;
  return (
    <section>
      <div className="flex items-center flex-col">
        <h2 className="bg-linear-to-r from-violet-500 via-blue-500 to-green-500 bg-clip-text py-4 text-4xl font-extrabold tracking-wide text-transparent drop-shadow-lg">
          Reservation Demo
          </h2>
      </div>
      <div className="flex items-center pr-12 pl-12">
        <TourView sdkKey={key} spaceId={Id} />
      </div>
      <div className="flex flex-col items-center pt-9">
        <Reservation/>
      </div>
    </section>
  );
}
