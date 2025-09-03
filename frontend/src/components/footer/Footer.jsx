import styles from "./Footer.module.css";
import { LuMessageSquareMore } from "react-icons/lu";
import { GrMapLocation } from "react-icons/gr";
import { MdAddToHomeScreen } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterLine } from "react-icons/ri";
import { LiaTelegramPlane } from "react-icons/lia";
const Footer = () => {
    const quickLinks = ["Home", "My Account", "My Orders", "About Us", "Payment Policy", "Privacy Policy", "Return & Refund Policy", "Shipping Policy", "Terms and Conditions", "Contact Us"];
    return (
        <>
            <div className={`w-screen bg-main-color-light mt-10 p-10 ${styles.hid}`}>
                <div className="w-full grid grid-cols-12">
                    <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-12 my-4">
                        <p className="text-2xl font-[600] text-[#111] mb-3">Quick Links</p>
                        {quickLinks.map((item, idx) => <div key={idx} className="cursor-pointer text-[14px] hover:text-main-color p-2 group"><span className="group-hover:border-b-[2px] border-main-color">{item}</span></div>)}
                    </div>
                    <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-5 md:col-span-6 sm:col-span-6 col-span-12 my-4">
                        <p className="text-2xl font-[600] text-[#111] mb-3">Get In Touch</p>
                        <div className="flex items-center group cursor-pointer">
                            <LuMessageSquareMore className="text-main-color text-3xl" /><span className="mx-3 text-[14px] hover:text-main-color group-hover:border-b-[2px] border-main-color">contact@nandawholesalemart.com</span>
                        </div>
                        <div className="flex items-center mt-3 group cursor-pointer">
                            <GrMapLocation className="text-main-color text-3xl" /><span className="mx-3 text-[15px] hover:text-main-color group-hover:border-b-[2px] border-main-color">78/A, Sector 62, trail
                                Noida, Uttar Pradesh - 201301</span>
                        </div>
                    </div>
                    <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 my-4">
                        <p className="text-2xl font-[600] text-[#111] mb-3">We Accept</p>
                        <img src="../../../public/payment-methods.png" alt="payment method image" className="w-64" />
                    </div>
                    <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                        <p className="text-2xl font-[600] text-[#111] mb-3">Social</p>
                        <div className="flex items-center cursor-pointer mb-2">
                            <IoLogoWhatsapp className="text-main-color text-3xl"/><span className="mx-3 text-[15px] hover:text-main-color group-hover:border-b-[2px] border-main-color">+919548411522</span>
                        </div>
                        <div className="flex items-center cursor-pointer mb-2">
                            <FaInstagram className="text-main-color text-3xl"/><span className="mx-3 text-[15px] hover:text-main-color group-hover:border-b-[2px] border-main-color">nanda_mart_insta_049</span>
                        </div>
                        <div className="flex items-center cursor-pointer mb-2">
                            <RiTwitterLine className="text-main-color text-3xl"/><span className="mx-3 text-[15px] hover:text-main-color group-hover:border-b-[2px] border-main-color">nanda_mart_twitter_049</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button className="border-[1px] border-red-500 p-2 text-red-500 text-[13px] font-[600] flex items-center bg-white"><MdAddToHomeScreen className="mr-2 text-xl text-black"/>ADD TO HOME</button>
                </div>
                <div className="flex items-center justify-center text-gray-400 opacity-35 text-md text-bold mt-6">
                    Copyright © by Nanda Wholesale Mart 2025. All rights reserved.
                </div>
            </div>
        </>
    );
}
export default Footer;