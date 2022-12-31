import Routers from '../base/routers';
import Services from '../modules/services';
import Media from '../modules/media';

export default class PublicRoutes extends Routers {

    private servicesHandler() {
        this.router.get('/service/all', Services.getAll);
        this.router.get('/service/:id', Services.getSingle);
    }

    private mediaHandler() {
        const media = new Media();
        this.router.get('/media/:id', media.getSingle);
        this.router.get('/media', media.getAll);
    }

    init() {
        this.servicesHandler();
        this.mediaHandler();
        return this.router
    }
}