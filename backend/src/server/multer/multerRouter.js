import { v2 as cloudinary } from 'cloudinary';
import Router from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowedFormats: ['jpg', 'png', 'jpeg'],
    },
});

 const uploadImage = multer({
    storage,
    limits: { fileSize: 1000000 },
}).single('image');

export const uploadImageMiddleware = (req, res, next) => {
    uploadImage(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ message: err.message });
        } else if (err) {
            return res.status(500).json({ message: err.message });
        }
        console.log('uploadImageMiddleware')
        next();
    });
};

router.post('/avatar', uploadImage, async (req, res) => {
    return res.json({ image: req.file.path });
});

export default router;
