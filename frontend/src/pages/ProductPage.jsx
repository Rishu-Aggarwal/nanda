import { useState } from "react";
import { useCentralStore } from "../CentralStore";

const ProductPage = () => {
    const images = [
        {
            public_id: "sfdjifsdhfhdf",
            url: "../../public/p1.webp",
            _id: "kfhdfhdfhd"
        },
        {
            public_id: "sfdjifsdhfhdf",
            url: "../../public/p2.webp",
            _id: "kfhdfhdfhd"
        },
        {
            public_id: "sfdjifsdhfhdf",
            url: "../../public/p3.webp",
            _id: "kfhdfhdfhd"
        }
    ];
    const [currImage, setCurrImage] = useState(0);
    const {setShowImageSlider,setSelectedIdx}=useCentralStore();
    return (
        <>
            <div className="w-full h-full">
                <div className="grid grid-cols-12 m-8">
                    <div className="col-span-6 grid grid-cols-12 ">
                        <div className="col-span-3">
                            {images.length > 0 && images.map((image, idx) => <div className="border w-[90px] h-[90px] grid place-items-center my-2 cursor-pointer" key={idx} onClick={() => setCurrImage(idx)}>
                                <img src={image.url} alt={image._id} />
                            </div>
                            )}
                        </div>
                        <div className="col-span-9 overflow-hidden">
                            <div className="w-[490px] h-[460px] cursor-pointer productHover" onClick={() => {setShowImageSlider(true);setSelectedIdx(currImage)}}>
                                <img src={images[currImage].url} alt={images[currImage]._id} className="w-full h-full object-contain" />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 grid place-items-center">
                        sdfsdf
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProductPage;