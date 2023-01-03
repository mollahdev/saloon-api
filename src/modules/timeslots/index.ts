import { Response, Request } from 'express';
import mongoose from 'mongoose';
import schema from './schema';
import Autobind from '../../utils/autobind';
import getTimeSlots from './generator';
const TimeslotModel = mongoose.model("Timeslot", schema);


export default class Timeslot {

    private static getOffTimeSlot() {
        return [
            
        ]
    }

    private static getBookedSlots() {
        return [
            
        ];
    }

    @Autobind
    static getAvailableSlots( req: Request, res: Response ) {
        const { duration } = req.body;
        const offTime       = this.getOffTimeSlot();
        const bookedSlots   = this.getBookedSlots(); 

        res.status(200).send({
            code: 200,
            message: "Slots received successfully",
            data: getTimeSlots({
                disabled: [...bookedSlots, ...offTime],
                gap: duration
            })
        })
    }
}