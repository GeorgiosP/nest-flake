import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnowflakeModule } from './infra/snowflake/snowflake.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SnowflakeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
