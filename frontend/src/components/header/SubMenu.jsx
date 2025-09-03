const SubMenu=({subItems,idx})=>{
    return(
        <>
        <div className={`2xl:w-[190px] xl:w-[190px] lg:w-[160px] md:w-[130px] sm:w-[145px] w-[75px] max-h-[120px] bg-white shadow 2xl:p-4 xl:p-4 lg:p-4 md:p-2 sm:p-0 p-0 pt-2 overflow-y-scroll`}>
            {subItems.map((ele,idx)=><div key={idx} className="2xl:p-2 xl:p-2 lg:p-2 md:p-1 sm:p-1 p-1 border-b text-black hover:text-main-color">{ele}</div>)}
        </div>
        </>
    );
}
export default SubMenu;