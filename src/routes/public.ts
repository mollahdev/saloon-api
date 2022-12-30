import Routers from '../base/routers';
import Services from '../modules/services';

export default class PublicRoutes extends Routers {

    private servicesHandler() {
        this.router.get('/service/all', Services.getAll);
        this.router.get('/service/:id', Services.getSingle);
    }

    init() {
        this.servicesHandler();
        return this.router
    }
}