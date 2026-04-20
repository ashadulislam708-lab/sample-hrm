import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsOptional } from 'class-validator';

export class UpdateIntegrationDto {
  @ApiProperty({
    description: 'Integration-specific configuration map',
    type: 'object',
    additionalProperties: true,
    example: { webhookUrl: 'https://hooks.slack.com/services/...' },
  })
  @IsObject()
  configJson: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  connected?: boolean;
}
