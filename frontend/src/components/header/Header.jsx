import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { PiUserCircleLight } from "react-icons/pi";
import { PiShoppingBagLight } from "react-icons/pi";
import { useHeader } from "./HeaderStore";
import { MdKeyboardArrowDown } from "react-icons/md";
import SubMenu from "./SubMenu";
import RecentSearch from "./RecentSearch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const Header = () => {
    const params = useParams();
    const { headerItems, headerSubItems, searchStr, setSearchStr, addToSeachArray, setRecentSearch } = useHeader();
    useEffect(() => {
        if (params.hasOwnProperty("search_str")) {
            setSearchStr(params.search_str);
        }
    }, [params])
    return (
        <div className="w-screen font-display sticky top-0 bg-white z-50">
            <div className="w-screen h-10 flex items-center justify-center bg-main-color">
                <p className="text-white text-[14px] font-[500]">FREE Delivery 🚚 on Every Order.</p>
            </div>
            <div className="grid sm:grid-cols-7 grid-cols-8 place-content-center border-b-[1px] 2xl:p-4 xl:p-4 lg:p-4 sm:p-2 p-1 items-center">
                <div className="sm:col-span-3 col-span-2">
                    <img src="../../../public/logo.webp" alt="logo image" className="w-16" />
                </div>
                <div className="relative flex items-center sm:col-span-3 col-span-4 w-full 2xl:h-[45px] xl:h-[45px] lg:h-[45px] md:text-[45px] sm:text-[40px] h-[35px] border-[1px] rounded-xl p-1">
                    <CiSearch className="2xl:text-3xl xl:text-3xl lg:text-3xl md:text-3xl sm:text-xl text-lg mx-2" />
                    <input type="search" placeholder="Search for a product" value={searchStr} className="w-full h-full border-none outline-none focus:ring-0 focus:outline-none font-display font-[500] text-gray-500 2xl:text-[14px] xl:text-[14px] lg:text-[14px] md:text-[14px] sm:text-[12px] text-[10px]" onFocus={() => { setRecentSearch(true) }} onChange={(e) => { setSearchStr(e.target.value) }} onKeyDown={(event) => event.key == "Enter" && addToSeachArray(searchStr)} onClick={() => setRecentSearch(true)} onInput={() => { setRecentSearch(true) }} onBlur={() => setTimeout(() => { setRecentSearch(false) }, 300)} />
                    <RecentSearch />
                </div>
                <div className="sm:col-span-1 col-span-2 grid grid-cols-3 place-items-center">
                    <div>
                        <CiLocationOn className="text-2xl lg:text-5xl cursor-pointer hover:text-main-color" />
                    </div>
                    <div>
                        <PiUserCircleLight className="text-2xl lg:text-5xl cursor-pointer hover:text-main-color" />
                    </div>
                    <div>
                        <PiShoppingBagLight className="text-2xl lg:text-5xl cursor-pointer hover:text-main-color" />
                    </div>
                </div>
            </div>
            <div className="2xl:flex xl:flex lg:flex md:flex sm:grid sm:grid-cols-5 grid grid-cols-5 sm:h-16 w-full 2xl:h-10 xl:h-10 lg:h-10 h-12 border-b items-center justify-between 2xl:px-8 xl:px-8 lg:px-8 md:px-6 sm:px-4 px-2">
                <div className="sm:col-span-1 sm:text-[12px] text-[8px] text-main-color font-medium opacity-90 xl:text-[14px] lg:text-[12px] md:text-[10px] cursor-pointer">Home</div>
                {headerItems.map((elementText, idx) =>
                    <div className="sm:col-span-1 sm:text-[12px] text-[7px] text-main-color font-medium opacity-90 xl:text-[14px] lg:text-[12px] md:text-[10px] group hover:text-black" key={idx}>
                        <div className="flex items-center cursor-pointer relative group">
                            {elementText}<MdKeyboardArrowDown className="xl:ml-1 lg:ml-1 md:ml-0 sm:ml-0 ml-0 xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[12px] text-[8px] font-semi-bold group-hover:rotate-180 transition-all" />
                            <div className={`absolute 2xl:top-[100%] xl:top-[100%] lg:top-[100%] md:top-[100%] ${idx < 4 ? "bottom-[100%]" : "top-[100%]"} 2xl:left-[-50%] xl:left-[-50%] lg:left-[-50%] md:left-[-50%] sm:left-[-8%] left-[-10%] hidden group-hover:block hover:block bg-white`}>
                                <SubMenu subItems={headerSubItems[idx]} />
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>
    );
}
export default Header;