import Routers from '../base/routers';
import Media from '../modules/media';
import Services from '../modules/services';
import Users from '../modules/users';

export default class PrivateRoutes extends Routers {

    private servicesHandler() {
        this.router.get('/service/all', Services.getAll);
        this.router.get('/service/:id', Services.getSingle);
        this.router.post('/service', Services.create);
        this.router.put('/service/:id', Services.update);
    }

    private mediaHandler() {
        const media = new Media();
        this.router.post('/media', media.uploader.array('files', 150), media.upload);
        this.router.delete('/media', media.delete);
        this.router.get('/media', media.getAll);
        this.router.get('/media/:id', media.getSingle);
        this.router.use( media.errorHandler );
    }

    private usersHandler() {
        this.router.get('/user/all', Users.getAll);
        this.router.post('/user/create', Users.create);
    }
   
    init() {
        this.mediaHandler();
        this.servicesHandler();
        this.usersHandler();

        return this.router
    }
}