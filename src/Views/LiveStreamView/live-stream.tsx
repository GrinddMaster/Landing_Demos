import TourView from '@/Components/TourComponents/Tour';
import AdminLiveStreamPanel from '@/Components/LiveStreamComponents/AdminLiveStreamPanel';
import { getSpaceConfig } from '../../Models/spaces';


export default function cartView() {
  const key = import.meta.env.VITE_SDK_KEY;
  const Id = import.meta.env.VITE_SPACE_ID;
  return (
    <section>
      <div className="flex flex-col items-center">
        <h2 className="bg-linear-to-r from-violet-500 via-blue-500 to-green-500 bg-clip-text py-4 text-4xl font-extrabold tracking-wide text-transparent drop-shadow-lg">
            LiveStream
        </h2>
      </div>
      <div className="flex items-center pr-12 pl-12">
        <TourView sdkKey={key} spaceId={'J9fEBnyKuiv'} />
      </div>
      <div className="flex flex-col items-center pt-9">
        <AdminLiveStreamPanel spaceConfig={getSpaceConfig('J9fEBnyKuiv')} />
      </div>
    </section>
  );
}
