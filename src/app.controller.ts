import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

// prefix(접두어)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user')
  getUser() {
    return 'User Page';
  }
}
