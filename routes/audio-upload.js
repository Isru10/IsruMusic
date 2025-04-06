import express from "express";
import { createAudio, deleteAudio, demoDelete, getAudios, updateAudio } from "../controllers/audio-upload.js";
const router = express.Router()
router.post("/",createAudio);

router.get("/", getAudios);

router.put("/:id",updateAudio);
  
router.delete('/:id',deleteAudio);
router.get('/demo',demoDelete);
export default router;