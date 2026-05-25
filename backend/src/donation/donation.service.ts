import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DonationService {
  constructor(private prismaService: PrismaService) {}

  async getDonations() {
    const donations = await this.prismaService.donation.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return donations.map((donation) => {
      return {
        name: donation.donorName,
        amount: `₦${(donation.amount / 100).toLocaleString()}`,
        time: new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
          timeStyle: 'medium',
        }).format(donation.createdAt),
      };
    });
  }

  async getCurrentMonthlyDonationsAmount() {
    const now = new Date();

    // First day of current month
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
      0,
      0,
      0,
      0,
    );

    // First day of next month
    const startOfNextMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      1,
      0,
      0,
      0,
      0,
    );

    const result = await this.prismaService.donation.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: startOfMonth,
          lt: startOfNextMonth,
        },
      },
    });

    return result._sum.amount || 0;
  }
}
