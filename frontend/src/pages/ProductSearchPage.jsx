import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProductNotFound from "./ProductNotFound";
import Filters from "../components/filters/Filters";
import Loader from "../components/loader/Loader";
import { searchProductPage } from "../store/features/ProductSlice";
import SortingFilters from "../components/sorting/SortingFilters";
import Product from "../components/products/Product";
const ProductSearchPage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(searchProductPage(params.search_str));
    }, [params.search_str]);
    const { product_search_page, product_search_page_status, product_search_page_error,product_search_page_total_products,product_search_page_categories,product_search_page_categories_quantity } = useSelector((state) => state.product);
    return (
        <>
            <div className="w-full min-h-[80vh] flex items-center justify-center">
                {product_search_page_status == "loading" ? <Loader /> :
                    product_search_page.length == 0 ? <ProductNotFound params={params} /> :
                        <div>
                            <div className="2xl:block xl:block lg:block md:block sm:block hidden">
                                <div className="grid grid-cols-12 gap-0">
                                    <div className="2xl:col-span-4 xl:col-span-3 lg:col-span-4 md:col-span-4 sm:col-span-5 col-span-6 mx-2">
                                        <Filters categories={product_search_page_categories} quantites={product_search_page_categories_quantity}/>
                                    </div>
                                    <div className="2xl:col-span-8 xl:col-span-9 lg:col-span-8 md:col-span-8 sm:col-span-7 col-span-6 my-8 mx-4 flex-col justify-end">
                                        <div className="flex justify-evenly flex-col">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="2xl:text-xl xl:text-lg lg:text-lg md:text-sm sm:text-sm text-xs font-semibold">Search "{params.search_str.length > 10 ? params.search_str.slice(0, 10) + " ..." : params.search_str}"</p>
                                                    <p className="2xl:text-lg xl:text-sm lg:text-sm md:text-xs sm:text-sx text-[10px]">{product_search_page_total_products} Products Found</p>
                                                </div>
                                                <div>
                                                    <SortingFilters />
                                                </div>
                                            </div>
                                            <div className="my-8">
                                                <div className="grid 2xl:grid-cols-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 place-items-center">
                                                    {product_search_page.length>2 && product_search_page.map((product, idx) => <div key={idx}>
                                                        <Product product={product} />
                                                    </div>)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                        </div>
                }
            </div>
        </>
    );
}
export default ProductSearchPage;