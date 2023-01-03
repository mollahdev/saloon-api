import Routers from '../base/routers';
import Services from '../modules/services';
import Media from '../modules/media';
import Timeslot from '../modules/timeslots';
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

    init() {
        this.servicesHandler();
        this.mediaHandler();
        this.timeslotsHandler();
        return this.router
    }
}