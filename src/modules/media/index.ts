/**
 * Mongose/Express dependencies 
 */ 
import { Response, Request, NextFunction } from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import fs from 'fs';
import _ from 'lodash';

/**
 * Internal dependencies 
 */ 
import { uploader } from './multer';
import schema from './schema';
import Autobind from '../../utils/autobind';

const MediaModel = mongoose.model("Media", schema);

export default class Media {
    uploader = uploader

    private getFileUrl( req: Request, filename: string ) {
        return req.protocol + '://' + req.get('host') + '/file/' + filename
    }

    private deleteFiles( ids: string[] ) {
        const promise = new Promise((resolve, reject) => {
            MediaModel.find({_id: { $in: ids}}, function(err: Error, data: any) {
                if( err || data.length === 0 ) {
                    reject()
                } else {
                    data.forEach( (item: {path: string}) => {
                        if( fs.existsSync( item.path ) ) {
                            fs.unlinkSync(item.path)
                        }
                    })
                    resolve(true)
                }
            });
        })
        return promise
    }

    private attachFileUrl( data: object | object[], req: Request ) {
        const self = this;
        const promise = new Promise((resolve, reject) => {
            if( Array.isArray( data ) ) {
                const newData: unknown[] = [];
                data.forEach(item => {
                    newData.push({
                        ...item.toObject(),
                        url: self.getFileUrl( req, item.filename )
                    });
                })
                resolve(newData)
            } else {
                const singleFile = data as {
                    filename: string,
                    toObject(): object,
                }
                resolve({
                    ...singleFile.toObject(),
                    url: self.getFileUrl( req, singleFile.filename )
                })   
            }
        })
        return promise
    }

    errorHandler( err: Error, req: Request, res: Response, next: NextFunction ) {
        if( err ) {
            if( err instanceof multer.MulterError ) {
                res.status(500).json({
                    code    : 500,
                    message : "There was an upload error!",
                })
            } else {
                res.status(500).json({
                    code    : 500,
                    message : err.message,
                })
            }
        } else {
            res.status(200).json({
                code    : 200,
                message : "Successfully uploaded"
            })
        }
    }

    async upload( req: Request, res: Response ) {
        if( !req.files || req.files?.length === 0 ) {
            res.status(400).json({
                code    : 400,
                message : "Upload failed!",
            })
        } else {
            await MediaModel.insertMany( req.files, err => {
                if( err ) {
                    res.status(400).json({
                        code    : 400,
                        message : "Upload failed!",
                    })
                } else {
                    res.status(200).json({
                        code    : 200,
                        message : "Successfully uploaded",
                        data    : req.files
                    })
                }
            } )
        }
    }

    @Autobind    
    getSingle( req: Request, res: Response ) {
        const isPublic  = req.baseUrl === '/public';
        const exclude   = !isPublic ? {} : {
            createdAt: 0,
            mimetype: 0,
            size: 0,
            path: 0,
            __v: 0,
        }

        MediaModel.findById(req.params.id, exclude, async (err: Error, data: any) => {
            if( err || _.isEmpty( data )) {
                res.status(404).send({
                    code: 404,
                    message: "No media found",
                })
            } else {
                res.status(200).send({
                    code: 200,
                    message: "Media successfully received",
                    data: await this.attachFileUrl( data, req )
                })
            }
        })
    }

    @Autobind
    delete( req: Request, res: Response ) {
        if( req.body.ids && Array.isArray( req.body.ids ) && !_.isEmpty(req.body.ids) ) {
            this.deleteFiles( req.body.ids )
            .then( () => {
                MediaModel.deleteMany({_id: { $in: req.body.ids}}, function(err) {
                    if( err ) {
                        res.status(500).send({
                            code: 500,
                            message: "Failed media delete"
                        })
                    } else {
                        res.status(200).send({
                            code: 200,
                            message: "Media successfully deleted",
                        })
                    }
                })
            })
            .catch(() => {
                res.status(500).send({
                    code: 500,
                    message: "Failed media delete"
                })
            });

        } else {
            res.status(404).send({
                code: 404,
                message: "Failed! ids empty"
            })
        }   
    }

    @Autobind
    getAll( req: Request, res: Response ) {
        const isPublic  = req.baseUrl === '/public';
        const exclude   = !isPublic ? {} : {
            createdAt: 0,
            mimetype: 0,
            size: 0,
            path: 0,
            __v: 0,
        }

        MediaModel.find({}, exclude, async (err: Error, data: any) => {
            if( err || _.isEmpty( data ) ) {
                res.status(404).send({
                    code: 404,
                    message: "No media found",
                })
            } else {
                res.status(200).send({
                    code: 200,
                    message: "Media successfully received",
                    data: await this.attachFileUrl( data, req )
                })
            }
        })
    }
}