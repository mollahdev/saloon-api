import path from 'path';
import multer from 'multer';

const allowedFile   = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/svg+xml'];
const uploadPath    = "./uploads/"; 

/**
 * Multer storage 
 */ 
const storage = multer.diskStorage({
    destination( req, file, cb ) {
        cb(null, uploadPath);
    },

    filename( req, file, cb ) {
        const fileExt   = path.extname(file.originalname);
        const fileName  = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join('-') + "-" + Date.now();
        cb( null, fileName + fileExt );
    }
})

/**
 * Multer uploader 
 */ 
export const uploader =  multer({
    storage: storage,
    limits: {
        fileSize: 1000000, // 1MB
    },
    fileFilter:( req, file, cb ) => {
        if( allowedFile.includes( file.mimetype ) ) {
            cb(null, true);   
        } else {
            cb( new Error( "only " + allowedFile.join(', ') + ' allowed!') )
        }
    }
})