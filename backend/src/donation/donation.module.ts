import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { DonationGateway } from './donation.gateway';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [DonationController],
  providers: [DonationService, DonationGateway, PrismaService],
  exports: [DonationGateway],
})
export class DonationModule {}
