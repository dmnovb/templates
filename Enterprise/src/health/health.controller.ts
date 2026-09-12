import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Process liveness' })
  check() {
    return {
      status: 'ok',
      uptime: process.uptime(),
    }
  }
}
