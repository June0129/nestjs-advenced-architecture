import { Alarm } from "../alarm";


export class AlarmCreatedEvent {
    constructor(readonly alarm: Alarm) {}
}