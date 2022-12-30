/**
 * Express dependencies 
 */ 
import { Response, Request } from 'express';
/**
 * Internal dependencies 
 */ 
import Routers from '../base/routers';

export default class PublicRoutes extends Routers {
    
    private test(_req: Request, res: Response) {
        res.json({
            name: 'hello world'
        })
    }

    init() {
        this.router.get('/', this.test);

        return this.router
    }
}
