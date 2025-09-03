import { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Filters from "./Filters";
const SortingFilters = () => {
    const [show,setShow]=useState(false);
    const filterRef=useRef(null);
    const[filterIdx,setFilterIdx]=useState(0);
    const filters=["Featured","Newest First","Price: High To Low","Price: Low To High","Alphabatically (A → Z)","Alphabatically (Z → A)"];

    useEffect(()=>{
        const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setTimeout(()=>{
        setShow(false);
        },100)
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    },[]);
    return (
        <div className="relative">
            <div className="xl:w-[250px] lg:w-[200px] md:w-[200px] sm:w-[150px] h-auto border-[1px] border-gray-200 rounded-xl p-2 cursor-pointer hover:shadow-md flex items-center justify-between buttonEffect" onClick={()=>setShow(!show)} ref={filterRef}>
                <div>
                    <p className="xl:text-[12px] lg:text-[12px] md:text-[12px] sm:text-[10px] text-gray-400">Sort By</p>
                    <p className="font-semibold xl:text-[14px] lg:text-[14px] md:text-[13px] sm:text-[11px]">{filters[filterIdx]}</p>
                </div>
                <div className="opacity-40">
                    <RiArrowDropDownLine className="text-2xl"/>
                </div>
            </div>
            <div className="absolute top-16 w-full z-50">
                    <Filters show={show} setShow={setShow} filters={filters} filterIdx={filterIdx} setFilterIdx={setFilterIdx} />
                </div>
        </div>
    );
}
export default SortingFilters;