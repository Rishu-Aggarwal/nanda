const Filters=({show,setShow,filters,filterIdx,setFilterIdx})=>{
    return(
        <>
        {show==true && <div className="bg-white shadow-xl rounded-lg p-2 border-[1px] border-gray-100">
            <div>
                {filters.map((item,idx)=><div key={idx} className="p-1 cursor-pointer hover:bg-gray-200" onClick={()=>setFilterIdx(idx)}>
                    <p className={`${idx==filterIdx && "font-semibold"} xl:text-sm lg:text-sm md:text-sm sm:text-[9px] text-[13px] p-1 `}>{item}</p>
                </div>)}
            </div>
            </div>}
        </>
    );
}
export default Filters;