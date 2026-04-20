import { Global, Module } from '@nestjs/common';
import { GatherService } from './gather.service';

@Global()
@Module({
  providers: [GatherService],
  exports: [GatherService],
})
export class GatherModule {}
