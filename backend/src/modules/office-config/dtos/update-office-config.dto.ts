import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class UpdateOfficeConfigDto {
  @ApiProperty({
    description: 'Map of { configKey: value }',
    example: {
      officeStartTime: '09:00',
      gracePeriodMinutes: 10,
      workDays: ['mon', 'tue', 'wed', 'thu', 'fri'],
    },
    type: 'object',
    additionalProperties: true,
  })
  @IsObject()
  values: Record<string, unknown>;
}
