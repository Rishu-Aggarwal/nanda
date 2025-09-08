import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import HeaderContextProvider from "./components/header/HeaderStore";
import { Outlet } from "react-router-dom";
import OverlaySlider from "./pages/OverlaySlider";
import { useCentralStore } from "./CentralStore";
const Layout = () => {
    const{showImageSlider}=useCentralStore();
    return (
        <div className={`relative ${showImageSlider==true && "w-[100%] h-[100vh] overflow-hidden"}`}>
            <OverlaySlider />
            <HeaderContextProvider>
                <Header />
            </HeaderContextProvider>
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
export default Layout;