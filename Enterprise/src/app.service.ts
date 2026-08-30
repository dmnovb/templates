import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getInfo() {
    return {
      name: 'enterprise',
      stack: 'NestJS',
      routes: ['GET /', 'GET /health', 'POST /ping', 'GET /docs'],
    }
  }

  ping(name = 'enterprise') {
    return {
      ok: true,
      message: `${name} is wired up`,
    }
  }
}
