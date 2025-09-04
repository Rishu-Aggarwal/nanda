import { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Filters from "./Filters";
import { useDispatch } from "react-redux";
import { sort } from "../../store/features/ProductSlice";
const SortingFilters = ({ products }) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const filterRef = useRef(null);
    const [filterIdx, setFilterIdx] = useState(0);
    const filters = ["Featured", "Newest First", "Price: High To Low", "Price: Low To High", "Alphabatically (A → Z)", "Alphabatically (Z → A)"];
    useEffect(() => {
        if (filterIdx == 2) {
            const sortedByHighToLow = [...products].sort((a, b) => b.cutPrice - a.cutPrice);
            dispatch(sort(sortedByHighToLow));
        } else if (filterIdx == 0) {
            dispatch(sort(products));
        } else if (filterIdx == 3) {
            const sortedByLowToHigh = [...products].sort((a, b) => a.cutPrice - b.cutPrice);
            dispatch(sort(sortedByLowToHigh));
        } else if (filterIdx == 4) {
            const sortedByAToZ = [...products].sort((a, b) => a.name.localeCompare(b.name));
            dispatch(sort(sortedByAToZ));
        } else if (filterIdx == 5) {
            const sortedByZToA = [...products].sort((a, b) => b.name.localeCompare(a.name));
            dispatch(sort(sortedByZToA));
        } else if (filterIdx == 1) {
            const sortedDesc = [...products].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
             dispatch(sort(sortedDesc));
        }
    }, [filterIdx]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setTimeout(() => {
                    setShow(false);
                }, 300)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="relative">
            <div className="xl:w-[250px] lg:w-[200px] md:w-[200px] sm:w-[150px] w-[190px] h-auto border-[1px] border-gray-200 rounded-xl p-2 cursor-pointer hover:shadow-md flex items-center justify-between buttonEffect" onClick={() => setShow(!show)} ref={filterRef}>
                <div>
                    <p className="xl:text-[12px] lg:text-[12px] md:text-[12px] sm:text-[10px] text-[12px] text-gray-400">Sort By</p>
                    <p className="font-semibold xl:text-[14px] lg:text-[14px] md:text-[13px] sm:text-[11px] text-[14px]">{filters[filterIdx]}</p>
                </div>
                <div className="opacity-40">
                    <RiArrowDropDownLine className="text-2xl" />
                </div>
            </div>
            <div className="absolute top-16 w-full z-10">
                <Filters show={show} setShow={setShow} filters={filters} filterIdx={filterIdx} setFilterIdx={setFilterIdx} />
            </div>
        </div>
    );
}
export default SortingFilters;