import { AutowiredEvent } from "src/shared/infrastructure/event-store/decorators/autowired-event.decorator";

@AutowiredEvent
export class AlarmAcknowledgedEvent {
    constructor(public readonly alarmId: string) {}
}