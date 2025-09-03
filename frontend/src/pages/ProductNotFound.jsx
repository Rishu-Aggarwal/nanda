import { Link } from "react-router-dom";
const ProductNotFound = ({params}) => {
    return (
        <div>
            <div className="m-10">
                <p className="font-display font-semibold text-xl">Search Result for "{params.search_str}"</p>
            </div>
            <div className="w-full h-[40vh] flex items-center justify-center"><img src="../../public/productNotFound.png" alt="product-not-found"/></div>
            <div>
                <p className="text-lg font-display font-semibold text-center">No Result Found</p>
                <p className="text-lg font-display font-semibold text-center">0 result found search again or go back to home to explore more products</p>
            </div>
            <div className="flex items-center justify-center">
                <Link to={"/"}><button className="bg-main-color text-white text-sm font-semibold border-none outline-none p-2 px-4 mt-4 rounded-md">Go To Home</button></Link>
            </div>
        </div>
    );
}
export default ProductNotFound;