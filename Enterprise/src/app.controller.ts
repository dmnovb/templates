import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { AppService } from './app.service.js'
import { PingDto } from './ping/dto/ping.dto.js'

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Stack info' })
  getInfo() {
    return this.appService.getInfo()
  }

  @Post('ping')
  @ApiOperation({ summary: 'Smoke test' })
  ping(@Body() body: PingDto) {
    return this.appService.ping(body.name?.trim() || 'enterprise')
  }
}
