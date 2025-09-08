import { useCentralStore } from "../CentralStore";
import ImageSlider from "../pages/ImageSlider";

const OverlaySlider = () => {
    const { showImageSlider, setShowImageSlider } = useCentralStore();

    if (!showImageSlider) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center"
            onClick={() => setShowImageSlider(false)}>
            <div className="w-[50%] h-[100vh] bg-white p-6 rounded-lg"
                onClick={(e) => e.stopPropagation()}>
                <ImageSlider />
            </div>
        </div>
    );
};

export default OverlaySlider;