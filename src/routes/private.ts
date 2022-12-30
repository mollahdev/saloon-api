/**
 * Express/External dependencies 
 */ 
import { Response, Request } from 'express';

/**
 * Internal dependencies 
 */ 
import Routers from '../base/routers';
import Media from '../modules/media';
import Services from '../modules/services';


export default class PrivateRoutes extends Routers {

    private postAppointment(_req: Request, res: Response) {
        res.status(200).send({
            code: 200,
            message: "Success",
            data: {
                name: "ashraf"
            }
        })
    }

    private servicesHandler() {
        this.router.get('/service/all', Services.getAll);
        this.router.get('/service/:id', Services.getSingle);
        this.router.post('/service', Services.create);
        this.router.put('/service/:id', Services.update);
    }

    private appointmentsHandler() {
        this.router.post('/appointment', this.postAppointment);
    }

    private mediaHandler() {
        const media = new Media();
        this.router.post('/media', media.uploader.array('files', 10), media.upload);
        this.router.use( media.errorHandler );
    }
   
    init() {
        
        this.mediaHandler();
        this.servicesHandler();
        this.appointmentsHandler();

        return this.router
    }
}