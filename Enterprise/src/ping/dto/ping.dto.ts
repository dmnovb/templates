import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, MaxLength } from 'class-validator'

export class PingDto {
  @ApiPropertyOptional({ example: 'atlas' })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  name?: string
}
