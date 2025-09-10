import { useState,useEffect } from "react";
import { useCentralStore } from "../CentralStore";
import { FaRegHeart } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { PiShoppingBagOpenThin } from "react-icons/pi";
import Product from "../components/products/Product";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from "../../node_modules/swiper/modules";
import { useSelector, useDispatch } from "react-redux";
import { productsFetch } from "../store/features/ProductSlice";
const ProductPage = () => {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.product);
    const reversed = [...products].reverse();
    useEffect(() => {
        dispatch(productsFetch());
    }, [dispatch])
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
    const { setShowImageSlider, setSelectedIdx } = useCentralStore();
    return (
        <>
            <div className="w-full h-full">
                <div className="grid grid-cols-12 m-8">
                    <div className="col-span-6 grid grid-cols-12">
                        <div className="col-span-3">
                            {images.length > 0 && images.map((image, idx) => <div className="border w-[90px] h-[90px] grid place-items-center my-2 cursor-pointer" key={idx} onClick={() => setCurrImage(idx)}>
                                <img src={image.url} alt={image._id} />
                            </div>
                            )}
                        </div>
                        <div className="col-span-9 overflow-hidden">
                            <div className="w-[490px] h-[460px] cursor-pointer productHover" onClick={() => { setShowImageSlider(true); setSelectedIdx(currImage) }}>
                                <img src={images[currImage].url} alt={images[currImage]._id} className="w-full h-full object-contain" />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6 py-4 px-8 w-full h-[70vh] overflow-y-scroll">
                        <div className="text-3xl font-normal font-display">
                            <p className="text-opacity-60">Zed Black Manthan Sattava Camphor Dhoop MRP- ₹15 (Pack Of 12)</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                <div className="text-2xl font-semibold mx-2">
                                    <span>₹ 85</span>
                                </div>
                                <div className="text-2xl font-normal mx-2 text-opacity-80 text-gray-800 ">
                                    <s><span>₹ 120</span></s>
                                </div>
                                <div className="h-[25px] w-[50px] mx-2 bg-main-color flex items-center justify-center rounded-md text-white">
                                    <span>₹ 85</span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="mx-4">
                                    <FaRegHeart className="text-3xl text-main-color cursor-pointer" title="Like" />
                                </div>
                                <div className="mr-4">
                                    <IoShareSocialOutline className="text-3xl text-main-color cursor-pointer" title="share" />
                                </div>
                            </div>
                        </div>
                        <div className="my-5">
                            <div className="flex items-center my-2"><PiShoppingBagOpenThin className="text-xl mx-1 opacity-60" /><p className="text-sm opacity-90">Minimum Order Quantity is 1 box</p></div>
                            <div className="flex items-center"><PiShoppingBagOpenThin className="text-xl mx-1 opacity-60" /><p className="text-sm opacity-90">Maximum Order Quantity is 6 box</p></div>
                        </div>
                        <div className="border-b-2"></div>
                        <div className="flex my-4 items-center justify-around">
                            <div className="w-[270px] h-[50px]"><button className="p-2 border w-full h-full border-main-color outline-none rounded-md text-main-color font-semibold">Add</button></div>
                            <div className="w-[270px] h-[50px]"><button className="p-2 border-none bg-main-color w-full h-full outline-none rounded-md text-white font-semibold">Buy Now</button></div>
                        </div>
                        <div className="border-b-2 mb-4"></div>
                        <div>
                            <div className="my-4"><p className="text-2xl font-semibold">Zed Black Manthan Sattava Sandal Dhoop (Pack of 12)</p></div>
                            <div>
                                <p className="text-[16px] font-medium whitespace-normal font-display leading-loose tracking-wide">Transform your living space into a haven of serenity with the Zed Black Manthan Sattava Sandal Dhoop. This aromatic delight brings the soothing essence of sandalwood to your home, creating an ambiance that promotes relaxation, mindfulness, and positivity. Perfect for daily rituals, meditation, or simply refreshing your surroundings, this pack is a must-have for every household.
                                    Unmatched Fragrance: Infused with the rich and calming scent of sandalwood, this dhoop uplifts your mood and fills the air with a divine aroma.
                                    Value Pack: Each pack contains 12 dhoop sticks, offering incredible value for money at an affordable MRP of just ₹15 per pack.
                                    Long-Lasting Burn: Crafted for a slow and steady burn, ensuring the fragrance lingers in your space for hours.
                                    Versatile Usage: Ideal for spiritual practices, festive occasions, or simply elevating the energy of your home or workspace.
                                    Trusted Quality: From the house of Nanda Wholesale Mart, this product is a mark of reliability and excellence.</p>
                            </div>
                        </div>
                        <div className="my-4">
                            <p className="text-lg font-medium">Whether you're</p>
                        </div>
                        <div className="border-b-2"></div>
                    </div>
                </div>
                <div className="m-8">
                    <div>
                        <p className="text-2xl font-bold">Related Product</p>
                    </div>
                    <div className="my-4">
                        <Swiper
                            modules={[Pagination, Navigation, Scrollbar, A11y]}
                            spaceBetween={20}
                            slidesPerView={5}
                            navigation={true}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1.5,
                                },
                                640: {
                                    slidesPerView: 2.5,
                                },
                                1024: {
                                    slidesPerView: 4,
                                },
                                1300: {
                                    slidesPerView: 5
                                }
                            }}
                            className="mySwiper"
                        >
                            {products.map((product, idx) => product?.category._id == "688f9754dee7227216848471" && <SwiperSlide key={idx}>
                                <div>
                                    <Product product={product} />
                                </div>
                            </SwiperSlide>)}
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProductPage;