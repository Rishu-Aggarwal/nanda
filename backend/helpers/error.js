export const error=(statusCode,messgae,success,res)=>{
    return res.status(statusCode).json({
        success:success,
        message:messgae
    });
}