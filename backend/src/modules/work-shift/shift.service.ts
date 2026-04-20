import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from '../../core/base/base.service';
import { ShiftRequest } from './shift-request.entity';
import { ShiftRepository } from './shift.repository';
import { ShiftStatusEnum } from '../../common/enums/shift-status.enum';
import { RoleEnum } from '../../common/enums/role.enum';
import { ApplyShiftDto } from './dtos/apply-shift.dto';

@Injectable()
export class ShiftService extends BaseService<ShiftRequest> {
  protected defaultRelations: string[] = ['user', 'approvedBy'];

  constructor(protected readonly repository: ShiftRepository) {
    super(repository, 'ShiftRequest');
  }

  async applyShift(
    userId: string,
    dto: ApplyShiftDto,
  ): Promise<ShiftRequest> {
    return this.repository.create({
      userId,
      requestedDays: dto.requestedDays,
      reason: dto.reason,
      status: ShiftStatusEnum.PENDING,
      effectiveFrom: dto.effectiveFrom ? new Date(dto.effectiveFrom) : null,
    });
  }

  async listOwn(userId: string): Promise<ShiftRequest[]> {
    return this.repository.findByUser(userId);
  }

  async listPending(): Promise<ShiftRequest[]> {
    return this.repository.findPending();
  }

  async listForTeamLeader(teamMemberIds: string[]): Promise<ShiftRequest[]> {
    return this.repository.findForTeamLeader(teamMemberIds);
  }

  private async transition(
    id: string,
    approverId: string,
    approverRole: RoleEnum,
    status: ShiftStatusEnum,
  ): Promise<ShiftRequest> {
    const existing = await this.repository.findById(id);
    if (!existing) throw new NotFoundException('Shift request not found');
    if (existing.status !== ShiftStatusEnum.PENDING) {
      throw new BadRequestException('Only pending shift requests can be reviewed');
    }
    if (approverRole === RoleEnum.EMPLOYEE) {
      throw new ForbiddenException('Employees cannot review shift requests');
    }
    const updated = await this.repository.update(id, {
      status,
      approvedById: approverId,
      approvedAt: new Date(),
    });
    if (!updated) throw new NotFoundException('Shift request not found');
    return updated;
  }

  async approveShift(
    id: string,
    approverId: string,
    approverRole: RoleEnum,
  ): Promise<ShiftRequest> {
    return this.transition(id, approverId, approverRole, ShiftStatusEnum.APPROVED);
  }

  async rejectShift(
    id: string,
    approverId: string,
    approverRole: RoleEnum,
  ): Promise<ShiftRequest> {
    return this.transition(id, approverId, approverRole, ShiftStatusEnum.REJECTED);
  }
}
