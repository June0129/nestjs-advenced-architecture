import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindAlarmsRepository } from 'src/alarms/application/ports/find-alarms.repository';
import { UpsertMaterializedAlarmRepository } from 'src/alarms/application/ports/upsert-materialized-alarm.repository';

import { AlarmItemEntity } from './entities/alarm-item.entity';
import { AlarmEntity } from './entities/alarm.entity';

import { MongooseModule } from '@nestjs/mongoose';
import { CreateAlarmRepository } from 'src/alarms/application/ports/create-alarm.repository';
import { OrmCreateAlarmRepository } from './repositories/create-alarm.repository';
import { OrmFindAlarmsRepository } from './repositories/find-alarms.repository';
import { OrmUpsertMaterializedAlarmRepository } from './repositories/upsert-alarm.repository';
import { MaterializedAlarmView, MaterializedAlarmViewSchema } from './schemas/materialized-alarm-view.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity]),
    MongooseModule.forFeature([
      { name: MaterializedAlarmView.name, schema: MaterializedAlarmViewSchema }
    ])
  ],
  providers: [
    {
      provide: CreateAlarmRepository,
      useClass: OrmCreateAlarmRepository, // 💡 This is where we bind the port to an adapter
    },
    {
      provide: FindAlarmsRepository,
      useClass: OrmFindAlarmsRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useClass: OrmUpsertMaterializedAlarmRepository
    }
  ],
  exports: [
    CreateAlarmRepository,
    FindAlarmsRepository,
    UpsertMaterializedAlarmRepository
  ],
})
export class OrmAlarmPersistenceModule {}