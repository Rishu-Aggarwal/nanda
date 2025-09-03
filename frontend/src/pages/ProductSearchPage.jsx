import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProductNotFound from "./ProductNotFound";
import Filters from "../components/filters/Filters";
import Loader from "../components/loader/Loader";
import { searchProductPage } from "../store/features/ProductSlice";
import SortingFilters from "../components/sorting/SortingFilters";
const ProductSearchPage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(searchProductPage(params.search_str));
    }, []);
    const { product_search_page, product_search_page_status, product_search_page_error } = useSelector((state) => state.product);
    return (
        <>
            <div className="w-full min-h-[100vh] flex items-center justify-center">
                {product_search_page_status == "loading" ? <Loader /> :
                    product_search_page.length == 0 ? <ProductNotFound params={params} /> :
                        <div className="w-full grid grid-cols-11">
                            <div className="xl:col-span-3 xl:p-8 xl:pl-20 xl:pt-12 lg:col-span-3 lg:p-8 lg:pt-12 md:col-span-3 md:p-8 md:px-2 md:pt-12 sm:col-span-3 sm:p-8 sm:px-2 sm:pt-12"><Filters /></div>
                            <div className="xl:col-span-8 lg:col-span-8 md:col-span-8 sm:col-span-8 mt-12 xl:px-8 lg:px-2">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="xl:text-lg lg:text-lg md:text-lg sm:text-sm font-semibold">Search Result For "{params.search_str.length>15?`${params.search_str.slice(0,15)} ...`:params.search_str}"</p>
                                        <p className="text-[15px]">60 Products Found</p>
                                    </div>
                                    <div>
                                        <SortingFilters/>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </>
    );
}
export default ProductSearchPage;