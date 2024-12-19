import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('snowflake')
  async getSnowflake(): Promise<any> {

    const result = await this.appService.getSnowflake();
    // result.res => return obj 
    // result.err => unable to get data from service
    if (result) {
      return result
    } else {
      return 'snowflake not connected'
    }
  }
}
