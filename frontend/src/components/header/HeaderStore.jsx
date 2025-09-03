import { createContext, useContext, useState } from "react";
import { searchCategories } from "../../store/features/CategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../store/features/ProductSlice";
import { useNavigate } from "react-router-dom";
const HeaderContext = createContext({
    headerItems: [],
    headerSubItems: [],
    searchStr: "",
    setSearchStr: () => { },
    addToSeachArray: (args) => { },
    recentSearch: Boolean,
    setRecentSearch: () => { },
    prevSearch: [],
    setPrevSearch: () => { },
    getPrevHistory: () => { }
});
const HeaderContextProvider = ({ children }) => {
    const navigate=useNavigate();
    const [recentSearch, setRecentSearch] = useState(false);
    const [searchStr, setSearchStr] = useState("");
    const dispatch = useDispatch();
    const { status, error, search_categories } = useSelector((state) => state.category);
    const productObj = useSelector((state) => state.product);
    const addToSeachArray = (value) => {
        if (localStorage.getItem('searchStrArray') == null && value.trim().length > 0) {
            let searchStrArray = [];
            searchStrArray.push(value);
            localStorage.setItem("searchStrArray", JSON.stringify(searchStrArray));
        } else if (value.trim().length > 0) {
            let arr = JSON.parse(localStorage.getItem('searchStrArray'));
            arr.unshift(value);
            if (arr.length > 10) {
                arr.pop();
            }
            let mySet = new Set(arr);
            arr = [...mySet];
            localStorage.setItem('searchStrArray', JSON.stringify(arr));
        }
        setRecentSearch(false);
        navigate(`/product/search/${value}`);
    }
    const [prevSearch, setPrevSearch] = useState([]);
    const getPrevHistory = () => {
        if (localStorage.getItem("searchStrArray") !== null && searchStr.trim().length == 0) {
            const arr = JSON.parse(localStorage.getItem('searchStrArray'));
            setPrevSearch(arr);
        } else if (localStorage.getItem("searchStrArray") !== null && searchStr.trim().length > 0) {
            //find match
            dispatch(searchProducts(searchStr));
            dispatch(searchCategories(searchStr));
            const arr = JSON.parse(localStorage.getItem("searchStrArray"));
            const matchRecent = [];
            for (let i = 0; i < arr.length; i++) {
                let str = arr[i].toLowerCase();
                if (str.includes(searchStr.toLowerCase())) {
                    matchRecent.push(str);
                }
            }
            for (let i = 0; i < productObj?.search_products.length; i++) {
                let str = productObj.search_products[i].name.toLowerCase();
                if (str.includes(searchStr.toLowerCase())) {
                    matchRecent.push(str);
                }
            }
            for (let i = 0; i < search_categories.length; i++) {
                let str = search_categories[i].name.toLowerCase();
                if (str.includes(searchStr.toLowerCase())) {
                    matchRecent.push(str);
                }
            }
            setPrevSearch(matchRecent);
        } else {
            if (searchStr.trim().length > 0) {
                dispatch(searchCategories(searchStr));
                dispatch(searchProducts(searchStr));
                const matchRecent = [];
                for (let i = 0; i < productObj?.search_products.length; i++) {
                    let str = productObj.search_products[i].name.toLowerCase();
                    if (str.includes(searchStr.toLowerCase())) {
                        matchRecent.push(str);
                    }
                }
                for (let i = 0; i < search_categories.length; i++) {
                    let str = search_categories[i].name.toLowerCase();
                    if (str.includes(searchStr.toLowerCase())) {
                        matchRecent.push(str);
                    }
                }
                setPrevSearch(matchRecent);
            } else {
                setPrevSearch([]);
            }
        }
    }
    const headerItems = ["Backery", "Snacks", "Beverages", "Cigarettes", "Masala", "Paan Corner", "Care", "Household", "Instant Food"];
    const headerSubItems = [["Biscuits", "Cake & Rusk"], ["Namkeen", "Other Snacks", "Chips"], ["Common Pharma", "Jucies & Shakes", "Cold Drinks", "Oral Cares & Wellness", "Toothpastes", "Hand Wash & Shaving Essentials",
        "Toothbrushes & Tongue Cleaners"], ["Other Brands", "GPI & Marlboro", "ITC"], ["Tea, Coffee & More", "Cooking Pastes & Sauces", "Masalas / Spices", "Jams & Honey", "Spreads, Sauces & ketchups", "Pickels & chutney"],
    ["Paan Masala", "Tabacco"], ["Body Care", "Bathing Soap", "Shampoos & Conditioners", "Make-up Essentials", "Deodorants & Talcs",
        "Facewashes & Creams", "Hair Care & Styling", "Candy & Chocolates", "Chewing Gums", "Chocolates", "Toffees"], ["Detergents & Laundry",
        "Dishwashing supplies", "Household & Cleaners"], ["Ready to Cook", "Ready To Eat"]];
    return <HeaderContext.Provider value={{ headerItems, headerSubItems, searchStr, setSearchStr, addToSeachArray, recentSearch, setRecentSearch, prevSearch, setPrevSearch, getPrevHistory }}>
        {children}
    </HeaderContext.Provider>
}
export const useHeader = () => useContext(HeaderContext);
export default HeaderContextProvider;