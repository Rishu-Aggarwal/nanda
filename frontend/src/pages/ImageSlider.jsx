import { RxCross2 } from "react-icons/rx";
import { useCentralStore } from "../CentralStore";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
const ImageSlider = () => {
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
    const { setShowImageSlider,selectedIdx} = useCentralStore();
    const[selectedImage,setSelectedImage]=useState(selectedIdx);
    return (
        <div className="h-[100vh] w-[100%] rounded-lg bg-white relative">
            <div className="absolute top-0 right-0 border-2 p-[1px] border-black rounded-md opacity-70 cursor-pointer" onClick={() => setShowImageSlider(false)}>
                <RxCross2 className="text-xl font-bold" />
            </div>
            <div className="w-full h-full p-4 pt-8">
                <div className="flex justify-evenly">
                    {images.length > 0 && images.map((image, idx) => <div className={`border w-[90px] h-[90px] grid place-items-center my-2 cursor-pointer ${idx==selectedImage && "border-blue-600"} hover:border-blue-600`} key={idx} onClick={() => setSelectedImage(idx)}>
                        <img src={image.url} alt={image._id} />
                    </div>
                    )}
                </div>
                <div className="mt-8 w-full h-full flex justify-center relative">
                    <img src={images[selectedImage].url} alt={images[selectedImage]._id} className="w-[500px] h-[450px] object-contain"/>
                    <div className="absolute left-0 top-[30%] cursor-pointer bg-gray-200 p-2 rounded-md" onClick={()=>selectedImage==0?setSelectedImage(images.length-1):setSelectedImage(selectedImage-1)}><IoIosArrowBack className="text-2xl"/></div>
                    <div className="absolute right-0 top-[30%] cursor-pointer bg-gray-200 p-2 rounded-md" onClick={()=>selectedImage==images.length-1?setSelectedImage(0):setSelectedImage(selectedImage+1)}><IoIosArrowForward className="text-2xl"/></div>
                </div>
            </div>
        </div>
    );
}
export default ImageSlider;