import _ from 'lodash';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import schema from './schema';
import { Response, Request } from 'express';

const UsersModel = mongoose.model("User", schema);
export default class Users {
    static async create( req: Request, res: Response ) {
        try {
            const hashedPassword = await bcrypt.hash( req.body.password, 10 );
            const user = new UsersModel({
                name    : req.body.name,
                username: req.body.username,
                password: hashedPassword,
                email   : req.body.email,
                phone   : req.body.phone,
                role    : req.body.role,
                image   : req.body.image,
                status  : req.body.status
            })
            await user.save();
            res.status(200).send({
                code: 200,
                message: "User successfully created",
            })
        } catch( err ) {
            res.status(500).send({
                code: 500,
                message: "Failed to create user",
                debug: err
            })
        }
    }

    static async login( req: Request, res: Response ) {
        try {
            if( _.isEmpty( req.body.email ) || _.isEmpty( req.body.password )) throw "Empty field";
            
            const user = await UsersModel.find({email: req.body.email});
            if( _.isEmpty( user ) ) throw "Authentication failed";

            const isValidPassword = await bcrypt.compare( req.body.password, user[0].password );
            if( !isValidPassword ) throw  "Authentication failed";

            const token = jwt.sign({
                id      : user[0]._id,
                username: user[0].username,
                email   : user[0].email,
            }, process.env.JWT_SIGN!)

            res.status(200).send({
                code: 200,
                message: "Login successful",
                data: token
            })

        } catch( err ) {
            res.status(401).send({
                code: 401,
                message: err,
            })
        }
    }

    static getAll( req: Request, res: Response ) {
        res.status(200).send({
            code: 200,
            message: "Users received successfully",
            data: []
        })
    }
}