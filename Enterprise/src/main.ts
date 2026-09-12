import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'

import { AppModule } from './app.module.js'
import type { Env } from './config/env.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService<Env, true>)
  const port = config.get('PORT', { infer: true })
  const host = config.get('HOST', { infer: true })
  const corsOrigin = config.get('CORS_ORIGIN', { infer: true })

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
          scriptSrc: [`'self'`, `https:`, `'unsafe-inline'`],
        },
      },
    }),
  )
  app.enableCors({
    origin: corsOrigin === '*' ? true : corsOrigin.split(',').map((value) => value.trim()),
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  app.enableShutdownHooks()

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Enterprise')
      .setDescription('NestJS enterprise starter')
      .setVersion('0.0.0')
      .build(),
  )
  SwaggerModule.setup('docs', app, document)

  await app.listen(port, host)
  console.log(`Enterprise is running on http://${host}:${port}`)
}

await bootstrap()
