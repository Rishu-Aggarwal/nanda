import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductNotFound from "./ProductNotFound";
import Filters from "../components/filters/Filters";
import Loader from "../components/loader/Loader";
import { searchProductPage } from "../store/features/ProductSlice";
import SortingFilters from "../components/sorting/SortingFilters";
import Product from "../components/products/Product";
import { LuMenu } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import ProductPage from "./ProductPage";
const ProductSearchPage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(searchProductPage(params.search_str));
    }, [params.search_str]);
    const { product_search_page, product_search_page_status, product_search_page_error, product_search_page_total_products, product_search_page_categories, product_search_page_categories_quantity } = useSelector((state) => state.product);
    const [phoneFilter, setPhoneFilter] = useState(false);
    return (
        <>
            <div className="w-full min-h-[80vh]">
                {product_search_page_status == "loading" ? <div className="w-full h-[100vh] flex items-center justify-center"><Loader /></div> :
                    product_search_page.length == 0 ? <ProductNotFound params={params} /> :
                    product_search_page.length==1?<ProductPage/>:
                        <div>
                            <div className="2xl:block xl:block lg:block md:block sm:block hidden">
                                <div className="grid grid-cols-12 gap-0">
                                    <div className="2xl:col-span-4 xl:col-span-3 lg:col-span-4 md:col-span-4 sm:col-span-5 col-span-6 mx-2 my-8">
                                        <Filters categories={product_search_page_categories} quantites={product_search_page_categories_quantity} />
                                    </div>
                                    <div className="2xl:col-span-8 xl:col-span-9 lg:col-span-8 md:col-span-8 sm:col-span-7 col-span-6 my-8 mx-4 flex-col justify-end">
                                        <div className="flex justify-evenly flex-col">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="2xl:text-xl xl:text-lg lg:text-lg md:text-sm sm:text-sm text-xs font-semibold">Search "{params.search_str.length > 10 ? params.search_str.slice(0, 10) + " ..." : params.search_str}"</p>
                                                    <p className="2xl:text-lg xl:text-sm lg:text-sm md:text-xs sm:text-sx text-[10px]">{product_search_page_total_products} Products Found</p>
                                                </div>
                                                <div>
                                                    <SortingFilters products={product_search_page} />
                                                </div>
                                            </div>
                                            <div className="my-8">
                                                <div className="grid 2xl:grid-cols-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 place-items-center">
                                                    {product_search_page.length > 2 && product_search_page.map((product, idx) => <div key={idx}>
                                                        <Product product={product} />
                                                    </div>)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="2xl:hidden xl:hidden lg:hidden md:hidden sm:hidden block">
                                <div className="relative">
                                    <div className="flex items-center justify-between border-b border-gray-200 px-8 py-2">
                                        <div>
                                            {phoneFilter == true ? <RxCross2 className="text-3xl text-red-500 cursor-pointer hover:opacity-60" onClick={() => setPhoneFilter(false)} /> : <LuMenu className="text-3xl text-main-color cursor-pointer hover:opacity-60" onClick={() => setPhoneFilter(true)} />}
                                        </div>
                                        <div>
                                            <SortingFilters products={product_search_page} />
                                        </div>
                                    </div>
                                    {phoneFilter == true && <div className="absolute top-[80%] left-4 z-20 bg-white p-0 m-0">
                                        <Filters categories={product_search_page_categories} quantites={product_search_page_categories_quantity} />
                                    </div>}
                                </div>
                                <div className="px-8 py-4">
                                    <p className="text-lg font-semibold">Search For "{params.search_str}"</p>
                                </div>
                                <div className="my-8">
                                    <div className="grid grid-cols-1 phone:grid-cols-2 place-items-center gap-4" >
                                        {product_search_page.length > 2 && product_search_page.map((product, idx) => <div key={idx}>
                                            <Product product={product} />
                                        </div>)}
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