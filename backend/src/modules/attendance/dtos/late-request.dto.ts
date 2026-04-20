import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateLateRequestDto {
  @ApiProperty({
    description: 'Attendance record id this request is tied to',
    format: 'uuid',
  })
  @IsUUID('4')
  attendanceId: string;

  @ApiProperty({
    description: 'Reason for being late',
    example: 'Traffic jam due to rain',
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  reason: string;
}
