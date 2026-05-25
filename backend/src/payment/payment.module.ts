import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { DonationModule } from '../donation/donation.module';
import { PrismaService } from '../prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [DonationModule],
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService, ConfigService],
})
export class PaymentModule {}
