import DataURIParser from "datauri/parser.js";
import path from "path";
const getDataUri=(file)=>{
    const parser=new DataURIParser();
    console.log(file)
    const fileName=path.extname(file.originalname);
    return parser.format(fileName,file.buffer);
}
export default getDataUri;