import { createContext, useContext,useState } from "react";

export const CentralStore=createContext({
    setShowImageSlider:()=>{},
    showImageSlider:false,
    setSelectedIdx:()=>{},
    selectedIdx:-1
});
const CentralStoreProvider=({children})=>{
    const [showImageSlider, setShowImageSlider] = useState(false);
    const[selectedIdx,setSelectedIdx]=useState(-1);
    return(
        <CentralStore.Provider value={{showImageSlider,setShowImageSlider,selectedIdx,setSelectedIdx}}>
            {children}
        </CentralStore.Provider>
    );
}
export const useCentralStore=()=>useContext(CentralStore);
export default CentralStoreProvider;