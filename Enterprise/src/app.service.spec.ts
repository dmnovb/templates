import { Test } from '@nestjs/testing'

import { AppService } from './app.service.js'

describe('AppService', () => {
  let service: AppService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AppService],
    }).compile()

    service = module.get(AppService)
  })

  it('returns stack info', () => {
    expect(service.getInfo().stack).toBe('NestJS')
  })

  it('pings with a default name', () => {
    expect(service.ping()).toEqual({
      ok: true,
      message: 'enterprise is wired up',
    })
  })
})
