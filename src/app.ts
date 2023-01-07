/**
 * Express/External dependencies 
 */ 
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { Response, Request, NextFunction } from 'express';
/**
 * Internal dependencies 
 */ 
import jwt from 'jsonwebtoken';
import ExpressApi from './express-api';
import PublicRoutes from './routes/public';
import PrivateRoutes from './routes/private';

dotenv.config();
class App extends ExpressApi {
    port    = process.env.SERVER_PORT as string;
    db_url  = process.env.DB_URL as string;
    constructor( public publicRoutes: any, privateRoutes: any ) {
        super();

        this.connectDB();
        this.api.use( express.json() );
        this.api.use('/file', express.static('uploads'))
        this.api.use('/public', publicRoutes.init() );
        this.api.use('/private', this.checkLogin, privateRoutes.init() );
        this.api.listen( this.port, this.listenCallback.bind(this) );
    }

    /**
     * check weather user login before accessting private route 
     */ 
    private checkLogin( req: Request & {userId?: string}, res: Response, next: NextFunction ) {
        const { authorization } = req.headers;
        try {
            const token     = authorization?.split(' ')[1]!;
            const decoded   = jwt.verify( token, process.env.JWT_SIGN! ) as {id: string};
            req.userId      = decoded.id
            next();
        } catch {
            res.status(401).send({
                code: 401,
                message: 'Unauthorized Access',
            })
        }
    }

    private listenCallback() {
        console.log(`listening port ${this.port}`)
    }
    /**
     * Connect MongoDB 
     */ 
    private connectDB() {
        mongoose.set('strictQuery', false);
        mongoose.connect( this.db_url )
        .then( () => console.log('db connect successfull') )
        .catch( error => console.log(error) )
    }
}

new App(
    new PublicRoutes(),
    new PrivateRoutes()
);