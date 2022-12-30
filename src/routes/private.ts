/**
 * Express dependencies 
 */ 
import { Response, Request } from 'express';
/**
 * Internal dependencies 
 */ 
import Routers from '../base/routers';

export default class PrivateRoutes extends Routers{
   
    private test(_req: Request, res: Response) {
        res.json({
            name: 'private hello world'
        })
    }

    init() {
        this.router.get('/', this.test);

        return this.router
    }
}
