import {v2 as cloudinary} from 'cloudinary'
cloudinary.config({
    cloud_name:process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    api_key:process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    secret:true
})
export const generateSignature = (req,res,next)=>{
    const {folder} = req.body;
    if(!folder){
        res.status(400)
        return next(new Error("folder needed"));
    }

    try{
        const timestamp = Math.round((new Date).getTime()/1000)
        const signature = cloudinary.utils.api_sign_request({
            timestamp,
            folder
        }, process.env.CLOUDINARY_API_SECRET);
        res.status(200).json({signature,timestamp});
    }
    catch(error){
        console.log(error);
        res.status(500);
        next(error);
    }
}