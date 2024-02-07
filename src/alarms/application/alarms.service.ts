import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAlarmCommand } from './commands/create-alarm.command';

import { CreateAlarmRepository } from './ports/create-alarm.repository';
import { GetAlarmsQuery } from './quries/get-alarms.query';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly alarmRepository: CreateAlarmRepository,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createAlarmCommand: CreateAlarmCommand) {
    return this.commandBus.execute(createAlarmCommand);
  }

  findAll() {
    return this.queryBus.execute(new GetAlarmsQuery());
  }
}