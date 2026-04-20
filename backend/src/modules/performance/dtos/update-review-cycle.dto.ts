import { PartialType } from '@nestjs/swagger';
import { CreateReviewCycleDto } from './create-review-cycle.dto';

export class UpdateReviewCycleDto extends PartialType(CreateReviewCycleDto) {}
