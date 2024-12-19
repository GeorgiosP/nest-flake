import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import * as snowflake from 'snowflake-sdk';

@Injectable()
export class SnowflakeConnectionService implements OnModuleDestroy {
  private connection: snowflake.Connection;

  constructor(private readonly configService: ConfigService) { }

  private readonly config = {
    account: this.configService.get<string>('SNOWFLAKE_ACCOUNT'),
    username: this.configService.get<string>('SNOWFLAKE_USERNAME'),
    password: this.configService.get<string>('SNOWFLAKE_PASSWORD'),
    database: this.configService.get<string>('SNOWFLAKE_DATABASE'),
    schema: this.configService.get<string>('SNOWFLAKE_SCHEMA'),
    warehouse: this.configService.get<string>('SNOWFLAKE_WAREHOUSE'),
  };

  async createConnection() {

    this.connection = snowflake.createConnection(this.config);


    this.connection.connect((err) => {
      if (err) {
        console.log('here for logs')
        console.error('Unable to connect to Snowflake:', err.message);
      } else {
        console.log('Snowflake connection established.');
      }
    });
  }

  async onModuleDestroy() {
    if (this.connection) {
      this.connection.destroy((err, conn) => {
        if (err) {
          console.error('Error destroying Snowflake connection:', err.message);
        } else {
          console.log(`Snowflake connection closed. with id: ${conn.getId()}`);
        }
      });
    }
  }

  getConnection(): snowflake.Connection {
    this.createConnection()
    if (this.connection && this.connection.isUp()) {
      return this.connection;
    } else {
      throw new Error('Snowflake connection is not established.');
    }
  }
}
