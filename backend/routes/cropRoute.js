import express from 'express';
import { listCrops, addCrops, removeCrops } from '../controllers/cropController.js';
import multer from 'multer';
const foodRouter = express.Router();

//Image Storage Engine (Saving Image to uploads folder & rename it)

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`);
    }
})

const upload = multer({ storage: storage})

foodRouter.get("/list",listCrops);
foodRouter.post("/add", upload.single('image'), addCrops);
foodRouter.post("/remove", removeCrops);

export default foodRouter;