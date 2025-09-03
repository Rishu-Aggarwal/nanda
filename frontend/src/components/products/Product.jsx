import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineCurrencyRupee } from "react-icons/md";
const Product = ({product}) => {
    return (
        <div className="w-[250px] h-[410px] border rounded-md shadow-xl bg-white p-2 cursor-pointer hover:shadow-2xl relative">
            <div className="w-full h-[240px] border p-2 rounded-lg relative">
                <img src={product.images.length>1? product?.images[1]?.url:product.images[0].url} alt={product.name} className="w-full h-full"/>
                <div className="absolute top-0 left-0 bg-main-color text-white p-[2px] px-2 text-sm rounded-tl-md rounded-br-md">
                    {product.disscount}%
                </div>
                <div className="absolute bottom-[5px] right-[5px] bg-gray-100 w-[30px] h-[30px] rounded-full flex items-center justify-center">
                    <IoIosHeartEmpty className="text-xl"/>
                </div>
            </div>
            <div className="w-full h-auto text-md font-medium font-display p-1 my-1">
                {product.name}
            </div>
            <div className="w-scrren flex items-center justify-start">
                <div className="mx-2 text-main-color font-semibold text-xl flex items-center"><MdOutlineCurrencyRupee/>{product.cutPrice}</div>
                <div className="flex items-center text-gray-500 relative"><MdOutlineCurrencyRupee/>{product.mrp} <div className="w-[50px] absolute top-[45%] border-t-2 border-gray-500"></div></div>
            </div>
            {product.stock<1?<div className="w-full absolute p-4 bottom-0 left-0 font-display font-semibold text-lg">Out Of Stock</div>:<div className="w-full h-[50px] p-4 absolute bottom-8 left-0">
                <button className="w-full outline-none bg-white border border-main-color flex items-center justify-center p-2 rounded-md text-main-color text-xl font-semibold font-display">Add</button>
            </div>}
            
        </div>
    );
}
export default Product;