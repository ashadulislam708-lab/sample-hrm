import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../../../common/enums/role.enum';
import { UserStatusEnum } from '../../../common/enums/user-status.enum';
import { User } from '../user.entity';

export class UserResponseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty({ required: false, nullable: true })
  phone: string | null;

  @ApiProperty({ required: false, nullable: true })
  department: string | null;

  @ApiProperty({ required: false, nullable: true })
  position: string | null;

  @ApiProperty({ enum: RoleEnum })
  role: RoleEnum;

  @ApiProperty({ enum: UserStatusEnum })
  status: UserStatusEnum;

  @ApiProperty({ required: false, nullable: true })
  joiningDate: Date | null;

  @ApiProperty({ required: false, nullable: true })
  teamLeaderId: string | null;

  @ApiProperty({ required: false, nullable: true })
  avatarUrl: string | null;

  @ApiProperty({ required: false, nullable: true })
  gatherTownEmail: string | null;

  @ApiProperty({ required: false, nullable: true })
  notionUserId: string | null;

  @ApiProperty({ required: false, nullable: true })
  lastLoginAt: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  static fromEntity(user: User): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.email = user.email;
    dto.fullName = user.fullName;
    dto.phone = user.phone;
    dto.department = user.department;
    dto.position = user.position;
    dto.role = user.role;
    dto.status = user.status;
    dto.joiningDate = user.joiningDate;
    dto.teamLeaderId = user.teamLeaderId;
    dto.avatarUrl = user.avatarUrl;
    dto.gatherTownEmail = user.gatherTownEmail;
    dto.notionUserId = user.notionUserId;
    dto.lastLoginAt = user.lastLoginAt;
    dto.createdAt = user.createdAt;
    dto.updatedAt = user.updatedAt;
    return dto;
  }
}
