import { Injectable } from '@nestjs/common';
import { SnowflakeQueryService } from './infra/snowflake/snowflake-query.service';

@Injectable()
export class AppService {
  constructor(private readonly queryService: SnowflakeQueryService) { }
  getHello(): string {
    return 'Hello World!';
  }

  getSnowflake() {
    const sql = 'SELECT * FROM USERS'
    return this.queryService.executeQuery(sql)
  }
}
