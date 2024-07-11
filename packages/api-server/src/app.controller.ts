import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'getHello', description: 'hello 가져오기' })
  @ApiCreatedResponse({ description: 'hello' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
