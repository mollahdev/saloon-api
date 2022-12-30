/**
 * Express/External dependencies 
 */ 
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
/**
 * Internal dependencies 
 */ 
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
        this.api.use( express.json() )
        this.api.use('/public', publicRoutes.init() )
        this.api.use('/private', privateRoutes.init() )
        this.api.listen( this.port, this.listenCallback.bind(this) );
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