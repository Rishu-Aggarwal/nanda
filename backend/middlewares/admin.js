import userModel from "../models/userModel.js";

const isAdmin=async(req,res,next)=>{
    try {
        const user=await userModel.findById({_id:req.user});
        if(!user){
            return res.json({
                success:false,
                message:"User not found."
            });
        }
        if(user.isAdmin){
            next();
        }else{
            return res.json({
                success:false,
                message:"Only admin can access."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Server error.",
            error
        });
    }
}
export default isAdmin;