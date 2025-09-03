import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import HeaderContextProvider from "./components/header/HeaderStore";
import { Outlet } from "react-router-dom";
const Layout = () => {
    return (
        <>
            <HeaderContextProvider>
                <Header />
            </HeaderContextProvider>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
export default Layout;