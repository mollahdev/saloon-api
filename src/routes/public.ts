import Routers from '../base/routers';
import Services from '../modules/services';
import Media from '../modules/media';
import Timeslot from '../modules/timeslots';
import Users from '../modules/users';

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

    private timeslotsHandler() {
        this.router.get('/timeslot/available', Timeslot.getAvailableSlots)
    }

    private usersHandler() {
        this.router.post('/user/login', Users.login);
    }

    init() {
        this.servicesHandler();
        this.mediaHandler();
        this.timeslotsHandler();
        this.usersHandler();
        return this.router
    }
}