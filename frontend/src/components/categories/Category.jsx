const Category = ({category}) => {
    return (
        <div className="w-[130px]">
            <div className="w-[130px] h-[130px] flex items-center justify-center border shadow-md rounded-lg p-4 cursor-pointer hover:border-gray-400">
                <img src={category?.image?.url} alt={category?.slug} />
            </div>
            <div className="font-display text-center p-2 text-md font-semibold">
                {category?.name}
            </div>
        </div>
    );
}
export default Category;