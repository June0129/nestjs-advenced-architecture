import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UpsertMaterializedAlarmRepository } from 'src/alarms/application/ports/upsert-materialized-alarm.repository';
import { AlarmCreatedEvent } from "src/alarms/domain/events/alarm-created.event";

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler implements IEventHandler<AlarmCreatedEvent> {

    private readonly logger = new Logger(AlarmCreatedEventHandler.name);

    constructor(
        private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,

    ) {}

    async handle(event: AlarmCreatedEvent) {
        this.logger.log(`Alarm Crated event: ${JSON.stringify(event)}`);

        // In a real-world application, we would have to ensure that this operation is atomic
        // with the creation of the alarm. Otherwise, we could end up with an alarm that is not reflected
        // in the read model (e.g. because the database operation fails).
        // For more information, check out "Transactional inbox/outbox pattern".
        await this.upsertMaterializedAlarmRepository.upsert({
            id: event.alarm.id,
            name: event.alarm.name,
            serverity: event.alarm.severity.value,
            triggeredAt: event.alarm.triggeredAt,
            isAcknowledged: event.alarm.isAcknowledged,
            items: event.alarm.items
        })
    }

}