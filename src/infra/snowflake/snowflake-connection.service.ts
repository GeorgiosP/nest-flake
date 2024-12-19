import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import * as snowflake from 'snowflake-sdk';

@Injectable()
export class SnowflakeConnectionService implements OnModuleDestroy {
  private connection: snowflake.Connection;

  constructor(private readonly configService: ConfigService) { }

  private readonly config = {
    timeout: 15 * 1000,
    account: this.configService.get<string>('SNOWFLAKE_ACCOUNT'),
    authenticator: 'SNOWFLAKE',
    username: this.configService.get<string>('SNOWFLAKE_USERNAME'),
    password: this.configService.get<string>('SNOWFLAKE_PASSWORD'),
    role: this.configService.get<string>('SNOWFLAKE_ROLE'),
    database: this.configService.get<string>('SNOWFLAKE_DATABASE'),
    warehouse: this.configService.get<string>('SNOWFLAKE_WAREHOUSE'),
    clientSessionKeepAlive: true
  };

  async createConnection() {

    this.connection = snowflake.createConnection(this.config);


    this.connection.connect((err) => {
      if (err) {
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
