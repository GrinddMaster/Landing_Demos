import Cart from "@/Components/CartComponents/Cart";
import TourView from "@/Components/TourComponents/Tour";
export default function cartView(){
    const key = import.meta.env.VITE_SDK_KEY;
    const Id = import.meta.env.VITE_SPACE_ID;
    return(
        <section>
            <div className="items-center">
            <h2>Vitual Mall</h2>
            </div>
            <Cart/>
            <div className="items-center">
                <TourView sdkKey={key} spaceId={Id} />
            </div>
        </section>
    );
}