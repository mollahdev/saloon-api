import { Response, Request } from 'express';
import mongoose from 'mongoose';
import schema from './schema';

const ServiceModel = mongoose.model("Service", schema);

export default class Services {

    static getAll( req: Request, res: Response ) {
        
        const isPublic  = req.baseUrl === '/public';
        const filter    = isPublic ? {status: 'active'} : {};
        const exclude   = !isPublic ? {} : {
            createdAt: 0,
            status: 0,
            __v: 0
        }

        ServiceModel.find( filter, exclude, (err: Error, data: any) => {
            if( err ) {
                res.status(404).send({
                    code: 404,
                    message: "No service found",
                })
            } else {
                res.status(200).send({
                    code: 200,
                    message: "Services received successfully",
                    data: data
                })
            }
        })
    }

    static getSingle( req: Request, res: Response ) {
        const isPublic  = req.baseUrl === '/public';
        const filter    = isPublic ? {status: 'active'} : {};
        const exclude   = !isPublic ? {} : {
            createdAt: 0,
            status: 0,
            __v: 0
        }

        ServiceModel.find( {_id: req.params.id, ...filter}, exclude, (err: Error, data: any) => {
            if( err ) {
                res.status(404).send({
                    code: 404,
                    message: "No service found",
                })
            } else {
                res.status(200).send({
                    code: 200,
                    message: "Service received successfully",
                    data: data
                })
            }
        })
    }

    static async create( req: Request, res: Response ) {
        const db = new ServiceModel( req.body );
        await db.save( (err, room) => {
            if( err ) {
                res.status(500).send({
                    code: 500,
                    message: "Could not create service",
                })
            } else {
                res.status(200).send({
                    code: 200,
                    message: "Service successfully created",
                    data: room._id
                })
            }
        } );
    }

    static update( req: Request, res: Response ) {
        ServiceModel.updateOne({_id: req.params.id}, {$set: req.body}, function(err: Error) {
            if( err ) {
                res.status(500).send({
                    code: 500,
                    message: "Could not update service",
                })
            } else {
                res.status(200).send({
                    code: 200,
                    message: "Service successfully updated",
                })
            }
        })
    }
}