import { Module } from '@nestjs/common';
import { SnowflakeService } from './snowflake.service';
import { SnowflakeController } from './snowflake.controller';

@Module({
  providers: [SnowflakeService],
  controllers: [SnowflakeController]
})
export class SnowflakeModule {}
