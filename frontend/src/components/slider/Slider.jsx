import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from '../../../node_modules/swiper/modules';
import { useDispatch, useSelector } from "react-redux";
import { fetchSliders } from '../../store/features/SliderSlice';
import Loader from '../loader/Loader';
import { useEffect } from 'react';
const Slider = () => {
    const dispatch = useDispatch();
    const { sliders, status, error } = useSelector((state) => state.slider);
    useEffect(() => {
        dispatch(fetchSliders());
    }, [dispatch]);
    return (
        <>
            <Swiper
                slidesPerGroup={1}
                slidesPerView={1}
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={0}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                loop={true}
                draggable={true}
                className="mySwiper">
                {status == "succeeded" && sliders.map((slider, idx) => <SwiperSlide key={idx}>
                    <img src={slider.image.url} alt={slider.title} />
                </SwiperSlide>)}
                {status == "loading" && <div className='w-screen h-[40vw] bg-main-color-light flex items-center justify-center'>
                    <Loader />
                </div>}
            </Swiper>
        </>
    );
}
export default Slider;