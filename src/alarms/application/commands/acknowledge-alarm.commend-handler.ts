import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Alarm } from 'src/alarms/domain/alarm';
import { AggregateRehydrator } from './../../../shared/application/aggregate-rehydrator';
import { AcknowledgeAlarmCommand } from './acknowledge-alarm.commend';

@CommandHandler(AcknowledgeAlarmCommand)
export class AcknowledgeAlarmCommandHandler implements ICommandHandler<AcknowledgeAlarmCommand> {
    
    private readonly logger = new Logger(AcknowledgeAlarmCommandHandler.name);

    constructor(private readonly aggregateRehydrator :AggregateRehydrator) {}

    async execute(command: AcknowledgeAlarmCommand): Promise<any> {
        this.logger.debug(`Processing "AcknowledgeAlarmCommand": ${JSON.stringify(command)}`);

        const alarm = await this.aggregateRehydrator.rehydrate(
            command.alarmId,
            Alarm
        );

        alarm.acknowledge();
        alarm.commit();

        return alarm;
    }
}