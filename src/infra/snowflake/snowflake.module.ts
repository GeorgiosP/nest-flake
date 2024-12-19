import { Module } from '@nestjs/common';
import { SnowflakeQueryService } from './snowflake-query.service';
import { SnowflakeConnectionService } from './snowflake-connection.service';

@Module({
    providers: [SnowflakeConnectionService, SnowflakeQueryService],
    exports: [SnowflakeQueryService]
})
export class SnowflakeModule {
}
