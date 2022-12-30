/**
 * Node dependencies 
 */ 
import path from 'path';
/**
 * Express dependencies 
 */ 
import { Response, Request, NextFunction } from 'express';
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
const uploader =  multer({
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

/**
 * Media class 
 */ 
export default class Media {
    uploader = uploader

    errorHandler( err: Error, req: Request, res: Response, next: NextFunction ) {
        if( err ) {
            if( err instanceof multer.MulterError ) {
                res.status(500).json({
                    code    : 500,
                    message : "There was an upload error!",
                    data    : []
                })
            } else {
                res.status(500).json({
                    code    : 500,
                    message : err.message,
                    data    : []
                })
            }
        } else {
            res.send('success')
        }
    }

    upload( req: Request, res: Response ) {
        if( req.files?.length === 0 ) {
            res.status(400).json({
                code    : 400,
                message : "upload failed!",
                data    : req.files
            })
        } else {
            res.status(200).json({
                code    : 200,
                message : "Successfully uploaded",
                data    : req.files
            })
        }
    }
}