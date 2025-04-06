import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from 'path';
import cors from 'cors';
import { log } from "console";
import mongoose from "mongoose";
import Song from "./models/songs.model.js";
import videoRoutes from "./routes/videos.js";
import signUploadRoutes from "./routes/sign-upload.js"
import { errorHandler } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary"
import multer from "multer"
import audioRoutes from "./routes/audio-upload.js"
import { fileURLToPath } from "url";
dotenv.config();
const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const app  = express();

const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();
// new one cloudinary file upload config
app.use(express.urlencoded({ extended: true }));
const storage = multer.memoryStorage();
const upload = multer({ storage });


// app.use(fileUpload({
//   useTempFiles: true,}))
  cloudinary.config({
    cloud_name:process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    api_key:process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
  })

// new one


// upload route

// upload route


app.use(cors());
app.use(express.json()); 





// app.post("/upload", async (req, res) => {
//   try {
//     if (!req.files || !req.files.audio) return res.status(400).json({ error: "No file uploaded" });

//     const { title, artist } = req.body;
//     const file = req.files.audio;

//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(file.tempFilePath, {
//       resource_type: "video",
//       folder: "music_uploads",
//     });

//     // Save to MongoDB
//     const newAudio = new Audio({
//       title,
//       artist,
//       url: result.secure_url,
//       public_id: result.public_id,
//     });

//     await newAudio.save();
//     res.json(newAudio);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// use the client app 
app.use(express.static(path.join(__dirname,'/isrumusicfront/dist')))

// render client for any path 
app.use("/api/videos",videoRoutes)
app.use("api/sign-upload" , signUploadRoutes)
app.use("/api/audio-upload",audioRoutes)
app.get('*', (req,res)=>res.sendFile(path.join(__dirname,'/isrumusicfront/dist/index.html')))

// app.use(errorHandler)

app.listen(PORT , ()=>{
    console.log(process.env.MONGOURI);
    
    connectDB();
      console.log('server at ' + PORT); 
  });