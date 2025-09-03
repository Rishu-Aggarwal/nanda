import { useState } from "react";
import RedCheckBox from "../checkbox/RedCheckBox";
import RangeSlider from "./RangeSlider";

const Filters = () => {
    const brands = ["BRITANNIA", "PRIYAGOLD", "KROWN", "PRIYAGOLD", "MARIO", "PATANJALI", "Sunfeast", "Britannia", "CADBURY", "Orion"];
    const types = [5, 6, 8, 2, 43, 22, 44, 66, 12, 6];
    const packs=[12,6,24,84,3,2,168];
    const mrps=[5,10,20,25,45,88,108];
    const flavours=["Choco","Plain","Salty","Sugur free","Coconet","Sweet"];
    const [brandsSlice, setBrandsSlice] = useState(5);
    const [packsSlice, setPacksSlice] = useState(5);
    const [mrpsSlice, setMrpsSlice] = useState(5);
    const [flavoursSlice, setFlavoursSlice] = useState(5);
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(1000);
    return (
        <div className="w-full border rounded-md">
            <div className="w-full border-b border-gray-300 flex items-center justify-between p-4">
                <div><p className="text-xl font-bold font-display">Filters</p></div>
                <div><p className="font-display font-extralight text-sm">Clear All</p></div>
            </div>
            <div className="w-full border-b border-gray-300 p-4">
                <div>
                    <p className="font-display text-xl font-bold">Category</p>
                    <div className="flex items-center mt-4">
                        <RedCheckBox label={"Biscuits and Cakes"} />
                        <p className="text-sm font-display font-extralight">(48)</p>
                    </div>
                </div>
            </div>
            <div className="w-full border-b border-gray-300 p-4">
                <div>
                    <p className="font-display text-xl font-bold">Brand</p>
                    {
                        brands.length <= 5 && brands.map((brand, idx) =>
                            <div className="flex items-center mt-4" key={idx}>
                                <RedCheckBox label={brand.toUpperCase()} />
                                <p className="text-sm font-display font-extralight">({types[idx]})</p>
                            </div>
                        )
                    }
                    {
                        brands.length > 5 && brands.slice(0, brandsSlice).map((brand, idx) =>
                            <div className="flex items-center mt-4" key={idx}>
                                <RedCheckBox label={brand.toUpperCase()} />
                                <p className="text-sm font-display font-extralight">({types[idx]})</p>
                            </div>
                        )
                    }
                    {brands.length > 5 && <div className="mt-4 cursor-pointer group" onClick={() => brandsSlice == 5 ? setBrandsSlice(brands.length) : setBrandsSlice(5)}>
                        <p className="text-[14px] font-normal text-gray-400 group-hover:text-gray-600">{brandsSlice != brands.length ? "See More +" : "See Less -"}</p>
                    </div>}
                </div>
            </div>
            <div className="w-full border-b border-gray-300 p-4">
                <p className="font-display text-xl font-bold">Price Range</p>
                <div>
                    <RangeSlider priceMin={priceMin} priceMax={priceMax} setPriceMax={setPriceMax} setPriceMin={setPriceMin} />
                </div>
            </div>
            <div className="w-full border-b border-gray-300 p-4">
                <p className="font-display text-xl font-bold">Pack Of</p>
                {
                    packs.length <= 5 && packs.map((pack, idx) =>
                        <div className="flex items-center mt-4" key={idx}>
                            <RedCheckBox label={"PACK OF "} />
                            <p className="text-sm font-display font-extralight">({pack})</p>
                        </div>
                    )
                }
                {
                    packs.length > 5 && packs.slice(0, packsSlice).map((pack, idx) =>
                        <div className="flex items-center mt-4" key={idx}>
                            <RedCheckBox label={"PACK OF "} />
                            <p className="text-sm font-display font-extralight">({pack})</p>
                        </div>
                    )
                }
                {packs.length > 5 && <div className="mt-4 cursor-pointer group" onClick={() => packsSlice == 5 ? setPacksSlice(packs.length) : setPacksSlice(5)}>
                    <p className="text-[14px] font-normal text-gray-400 group-hover:text-gray-600">{packsSlice != packs.length ? "See More +" : "See Less -"}</p>
                </div>}
            </div>
            <div className="w-full border-b border-gray-300 p-4">
                <p className="font-display text-xl font-bold">MRP</p>
                {
                    mrps.length <= 5 && mrps.map((mrp, idx) =>
                        <div className="flex items-center mt-4" key={idx}>
                            <RedCheckBox label={`₹ ${mrp}`} />
                        </div>
                    )
                }
                {
                    mrps.length > 5 && mrps.slice(0, mrpsSlice).map((mrp, idx) =>
                        <div className="flex items-center mt-4" key={idx}>
                            <RedCheckBox label={`₹ ${mrp}`} />
                        </div>
                    )
                }
                {mrps.length > 5 && <div className="mt-4 cursor-pointer group" onClick={() => mrpsSlice == 5 ? setMrpsSlice(mrps.length) : setMrpsSlice(5)}>
                    <p className="text-[14px] font-normal text-gray-400 group-hover:text-gray-600">{mrpsSlice != mrps.length ? "See More +" : "See Less -"}</p>
                </div>}
            </div>
            <div className="w-full border-b border-gray-300 p-4">
                <p className="font-display text-xl font-bold">Flavour</p>
                {
                    flavours.length <= 5 && flavours.map((flavour, idx) =>
                        <div className="flex items-center mt-4" key={idx}>
                            <RedCheckBox label={flavour.toUpperCase()} />
                        </div>
                    )
                }
                {
                    flavours.length > 5 && flavours.slice(0, flavoursSlice).map((flavour, idx) =>
                        <div className="flex items-center mt-4" key={idx}>
                            <RedCheckBox label={flavour.toUpperCase()} />
                        </div>
                    )
                }
                {flavours.length > 5 && <div className="mt-4 cursor-pointer group" onClick={() => flavoursSlice == 5 ? setFlavoursSlice(flavours.length) : setFlavoursSlice(5)}>
                    <p className="text-[14px] font-normal text-gray-400 group-hover:text-gray-600">{flavoursSlice != flavours.length ? "See More +" : "See Less -"}</p>
                </div>}
            </div>
        </div>
    );
}
export default Filters;