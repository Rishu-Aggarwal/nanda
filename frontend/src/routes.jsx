import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Layout from "./Layout";
import ProductSearchPage from "./pages/ProductSearchPage";
const router=createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                index:true,
                element:<App/>
            },
            {
                path:"/product/search/:search_str",
                element:<ProductSearchPage/>
            }
        ]
    }
]);
export default router;