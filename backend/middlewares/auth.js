import JWT from "jsonwebtoken";
const isAuth=(req,res,next)=>{
    try {
        const token=JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        if(!token){
            return res.json({
                success:false,
                message:"Token not found."
            });
        }else{
            req.user=token.id;
            next();
        }
    } catch (error) {
        res.json({
            success:false,
            message:"Please authenticate yourself.",
            error
        });
        console.log(error);
    }
}
export default isAuth;