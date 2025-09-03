import { useEffect } from "react";
import Category from "./Category";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/features/CategorySlice";
import Loader from "../loader/Loader";
const Categories = () => {
    const dispatch = useDispatch();
    const { categories, status, error } = useSelector((state) => state.category);
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch])
    return (
        <>
            <div className="m-4 my-8">
                <div className="2xl:text-2xl xl:text-2xl lg:text-xl md:text-xl sm:text-md text-sm font-display font-bold mt-8 mb-4">
                    Shop by Categories
                </div>
                <div className="w-[100%] flex flex-row flex-wrap justify-evenly">
                    {status == "succeeded" && categories.map((category, idx) => <div className="flex-initial mx-2 my-6" key={idx}>
                        <Category category={category}/>
                    </div>)}
                    {status=="loading" && <div className="w-full h-[40vw] flex items-center justify-center"><Loader/></div>}
                </div>
            </div>
        </>
    );
}
export default Categories;