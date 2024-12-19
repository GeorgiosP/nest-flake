import { Injectable } from '@nestjs/common';
import { SnowflakeConnectionService } from './snowflake-connection.service';

@Injectable()
export class SnowflakeQueryService {
  constructor(private readonly connectionService: SnowflakeConnectionService) { }

  async executeQuery<T>(sql: string, params?: any[]): Promise<T> {

    try {
      const connection = this.connectionService.getConnection();

      return new Promise((resolve, reject) => {
        connection.execute({
          sqlText: sql,
          binds: params || [],
          complete: (err, stmt, rows) => {
            if (err) {
              return reject(err);
            }
            resolve(rows as T);
          },
        });
      });
    } catch (e) {
      console.log(e)
      return
    }

  }
}