/**
 * Express dependencies 
 */ 
import express from 'express';
/**
 * Internal dependencies 
 */ 
import ExpressApi from './express-api';
import PublicRoutes from './routes/public';
import PrivateRoutes from './routes/private';

class App extends ExpressApi {
    port = 3000;
    constructor( public publicRoutes: any, privateRoutes: any ) {
        super();

        this.api.use( express.json() )
        this.api.use('/public', publicRoutes.init() )
        this.api.use('/private', privateRoutes.init() )

        this.api.listen( this.port, this.listenCallback.bind(this) );
    }

    listenCallback() {
        console.log(`listening port ${this.port}`)
    }
}


new App(
    new PublicRoutes(),
    new PrivateRoutes()
);