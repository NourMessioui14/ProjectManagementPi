import { Module } from '@nestjs/common';
import { VideocallService } from './videocall.service';
import { VideocallController } from './videocall.controller';

@Module({
  providers: [VideocallService],
  controllers: [VideocallController]
})
export class VideocallModule {}
