import { GoArrowUpLeft } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { useHeader } from "./HeaderStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const RecentSearch = () => {
    const {
        searchStr,
        recentSearch,
        getPrevHistory,
        prevSearch,
        setRecentSearch,
        setSearchStr,
        addToSeachArray
    } = useHeader();

    useEffect(() => {
        getPrevHistory();
    }, [searchStr]);

    const handleClick = (value) => {
        setSearchStr(value);
        setRecentSearch(false);
        addToSeachArray(value);
    };

    return (
        <>
            {recentSearch && (
                <div className="absolute w-full border bg-[#fff] z-10 rounded-xl top-[110%] shadow-xl left-0 max-h-64 overflow-y-scroll p-2">

                    {searchStr.trim().length > 0 && (
                        <Link to={`/product/search/${searchStr}`}>
                            <div
                                className="flex items-center justify-between border-b text-sm font-semibold font-display p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleClick(searchStr)}
                            >
                                <div className="flex items-center justify-start">
                                    <CiSearch className="text-2xl mr-2" />
                                    <p className="2xl:text-lg xl:text-sm md:text-sm sm:text-[10px] text-[10px]">{searchStr}</p>
                                </div>
                                <GoArrowUpLeft className="text-2xl" />
                            </div>
                        </Link>
                    )}

                    {prevSearch.length > 0 &&
                        prevSearch.map((item, idx) => (
                            <Link key={idx} to={`/product/search/${item}`}>
                                <div
                                    className="flex items-center justify-between border-b text-sm font-semibold font-display p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleClick(item)}
                                >
                                    <div className="flex items-center justify-start">
                                        <CiSearch className="text-2xl mr-2" />
                                        <p className="2xl:text-lg xl:text-sm md:text-sm sm:text-[10px] text-[10px]">{item}</p>
                                    </div>
                                    <GoArrowUpLeft className="text-2xl" />
                                </div>
                            </Link>
                        ))}
                </div>
            )}
        </>
    );
};

export default RecentSearch;