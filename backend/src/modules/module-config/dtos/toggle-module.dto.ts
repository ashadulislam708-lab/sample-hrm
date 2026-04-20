import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ModuleStatusEnum } from '../../../common/enums/module-status.enum';

export class ToggleModuleDto {
  @ApiProperty({ enum: ModuleStatusEnum })
  @IsEnum(ModuleStatusEnum)
  status: ModuleStatusEnum;
}
