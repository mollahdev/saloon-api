/**
 * Express dependencies 
 */ 
import { Response, Request } from 'express';
/**
 * Internal dependencies 
 */ 
import Routers from '../base/routers';
import Media from '../modules/media';

const media = new Media();
export default class PrivateRoutes extends Routers {

    private postAppointment(_req: Request, _res: Response) {

    }
   
    init() {
        this.router.post('/media', media.uploader.array('files', 10), media.upload);
        this.router.use( media.errorHandler );
        return this.router
    }
}
