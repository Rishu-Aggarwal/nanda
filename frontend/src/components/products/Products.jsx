import Product from "./Product";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from "../../../node_modules/swiper/modules";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { productsFetch } from "../../store/features/ProductSlice";
import Loader from "../loader/Loader";
const Products = () => {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.product);
    const reversed = [...products].reverse();
    useEffect(() => {
        dispatch(productsFetch());
    }, [dispatch])
    return (
        <div className="w-screen h-auto">
            <div className="w-screen h-auto bg-main-color-light p-4 my-8 py-8">
                <div className="w-full h-[50px] flex items-center justify-between mb-8">
                    <div className="col-span-1 2xl:text-2xl xl:text-2xl lg:text-2xl md:text-xl sm:text-md text-sm font-display font-bold text-main-color cursor-pointer">
                        💥 Newly Added Products
                    </div>
                    <div className="col-span-1 text-main-color font-semibold cursor-pointer">
                        <span className="hover:border-b-2 border-main-color 2xl:text-lg xl:text-lg lg:text-lg md:text-md sm:text-md text-sm">View All</span>
                    </div>
                </div>
                <div className="flex justify-evenly flex-wrap items-center">
                    {status == "suceeded" && products.slice(0, 10).map((product, idx) => <div className="my-4 mx-2" key={idx}>
                        <Product product={product} />
                    </div>)}
                    {status == "loading" && <div className="w-full h-[40vw] flex items-center justify-center"><Loader /></div>}
                </div>
            </div>
            <div className="w-screen h-auto bg-white p-4 my-8 py-8">
                <div className="w-full h-[50px] flex items-center justify-between mb-8">
                    <div className="col-span-1 2xl:text-2xl xl:text-2xl lg:text-2xl md:text-xl sm:text-md text-sm font-display font-bold  cursor-pointer">
                        Biscuit Worth ₹10
                    </div>
                    <div className="col-span-1 font-semibold cursor-pointer">
                        <span className="hover:border-b-2 border-main-color 2xl:text-lg xl:text-lg lg:text-lg md:text-md sm:text-md text-sm">View All</span>
                    </div>
                </div>
                <div className="flex justify-evenly flex-wrap items-center">
                    {status == "suceeded" && products.map((product, idx) => product?.category?._id == "688f968bdee722721684844d" && <div className="my-4 mx-2" key={idx}> <Product product={product} /></div>)}
                    {status == "loading" && <div className="w-full h-[40vw] flex items-center justify-center"><Loader /></div>}
                </div>
            </div>
            <div className="w-screen h-auto bg-main-color-light p-4 my-8 py-8">
                <div className="w-full h-[50px] flex items-center justify-between mb-8">
                    <div className="col-span-1 2xl:text-2xl xl:text-2xl lg:text-2xl md:text-xl sm:text-md text-sm font-display font-bold text-main-color cursor-pointer">
                        Candy's🍬🍭
                    </div>
                    <div className="col-span-1 text-main-color font-semibold cursor-pointer">
                        <span className="hover:border-b-2 border-main-color 2xl:text-lg xl:text-lg lg:text-lg md:text-md sm:text-md text-sm">View All</span>
                    </div>
                </div>
                <div>
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
                            1300:{
                                slidesPerView:5
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
            <div className="w-screen h-auto bg-white my-8 py-8">
                <div className="w-full h-[50px] flex items-center justify-between mb-8 p-4">
                    <div className="col-span-1 2xl:text-2xl xl:text-2xl lg:text-2xl md:text-xl sm:text-md text-sm font-display font-bold  cursor-pointer">
                        Our Collections
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-evenly">
                    <div className="p-2 w-[450px] h-[220px]">
                        <img src="../../../public/collection1.webp" alt="collection1" className="w-full h-full" />
                    </div>
                    <div className="p-2 w-[450px] h-[220px]">
                        <img src="../../../public/collection2.webp" alt="collection2" className="w-full h-full" />
                    </div>
                    <div className="p-2 w-[450px] h-[220px]">
                        <img src="../../../public/collection3.webp" alt="collection3" className="w-full h-full" />
                    </div>
                </div>
            </div>
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  items-center justify-evenly">
                <div className="col-span-1 flex items-center justify-center p-4">
                    <div className="w-[110px] h-[80px] p-2">
                        <img src="../../../public/feature1.png" alt="feature1" className="w-full h-full" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold font-display">Secured Payments</p>
                        <p className="text-sm">All modes of payment available
                            for fast & easy transaction</p>
                    </div>
                </div>
                <div className="col-span-1 flex items-center justify-center p-4">
                    <div className="w-[110px] h-[80px] p-2">
                        <img src="../../../public/feature2.png" alt="feature2" className="w-full h-full" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold font-display">Best Price</p>
                        <p className="text-sm">We offer best price & discounts
                            on all our products</p>
                    </div>
                </div>
                <div className="col-span-1 flex items-center justify-center p-4">
                    <div className="w-[110px] h-[80px] p-2">
                        <img src="../../../public/feature3.png" alt="feature3" className="w-full h-full" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold font-display">Quality assurance</p>
                        <p className="text-sm">All goods are fresh in stock &
                            quality assured</p>
                    </div>
                </div>
                <div className="col-span-1 flex items-center justify-center p-4">
                    <div className="w-[110px] h-[80px] p-2">
                        <img src="../../../public/feature4.png" alt="feature4" className="w-full h-full" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold font-display">Fast Delivery</p>
                        <p className="text-sm">With the help of our partners we
                            make our deliveries faster</p>
                    </div>
                </div>
            </div>
            <div className="w-screen h-auto bg-main-color-light p-4 my-8 py-8">
                <div className="w-full h-[50px] flex items-center justify-between mb-8">
                    <div className="col-span-1 2xl:text-2xl xl:text-2xl lg:text-2xl md:text-xl sm:text-md text-sm font-display font-bold text-main-color cursor-pointer">
                        Best Selling Ciggerates & Tabaco
                    </div>
                    <div className="col-span-1 text-main-color font-semibold cursor-pointer">
                        <span className="hover:border-b-2 border-main-color 2xl:text-lg xl:text-lg lg:text-lg md:text-md sm:text-md text-sm">View All</span>
                    </div>
                </div>
                <div className="flex justify-evenly flex-wrap items-center">
                    {status == "suceeded" && products.map((product, idx) => product?.category?._id == "688f96e4dee722721684845d" && <div className="my-4 mx-2" key={idx}> <Product product={product} /></div>)}
                    {status == "loading" && <div className="w-full h-[40vw] flex items-center justify-center"><Loader /></div>}
                </div>
            </div>
            <div className="w-screen h-auto bg-white p-4 my-8 py-8">
                <div className="w-full h-[50px] flex items-center justify-between mb-8">
                    <div className="col-span-1 2xl:text-2xl xl:text-2xl lg:text-2xl md:text-xl sm:text-md text-sm font-display font-bold  cursor-pointer">
                        Products
                    </div>
                    <div className="col-span-1 font-semibold cursor-pointer">
                        <span className="hover:border-b-2 border-main-color 2xl:text-lg xl:text-lg lg:text-lg md:text-md sm:text-md text-sm">View All</span>
                    </div>
                </div>
                <div className="flex justify-evenly flex-wrap items-center">
                    {status == "suceeded" && reversed.slice(0, 20).map((product, idx) => <div className="my-4 mx-2" key={idx}>
                        <Product product={product} />
                    </div>)}
                    {status == "loading" && <div className="w-full h-[40vw] flex items-center justify-center"><Loader /></div>}
                </div>
            </div>
            <div className="w-screen flex items-center justify-center">
                <button className="p-3 rounded-md border-none outline-none bg-main-color font-display text-white font-bold">View All Products</button>
            </div>
        </div>
    );
}
export default Products;