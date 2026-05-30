import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GetDonationsDto } from './dto/get-donations.dto';

@Injectable()
export class DonationService {
  constructor(private prismaService: PrismaService) {}
  async getDonations(query: GetDonationsDto) {
    const { page = 1, limit = 20, search } = query;

    const skip = (page - 1) * limit;

    let where: any = {};

    if (search) {
      where.OR = [{ donorName: { contains: search, mode: 'insensitive' } }];
    }

    const [donations, total] = await this.prismaService.$transaction([
      this.prismaService.donation.findMany({
        where: {
          ...where,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },

        select: {
          id: true,
          donorName: true,
          amount: true,
          createdAt: true,
        },
      }),

      this.prismaService.donation.count({ where }),
    ]);

    return {
      data: donations.map((donation) => {
        return {
          name: donation.donorName,
          amount: `₦${(donation.amount / 100).toLocaleString()}`,
          time: new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'medium',
          }).format(donation.createdAt),
        };
      }),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // async getDonations() {
  //   const donations = await this.prismaService.donation.findMany({
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //   });

  //   return donations.map((donation) => {
  //     return {
  //       name: donation.donorName,
  //       amount: `₦${(donation.amount / 100).toLocaleString()}`,
  //       time: new Intl.DateTimeFormat('en-US', {
  //         dateStyle: 'medium',
  //         timeStyle: 'medium',
  //       }).format(donation.createdAt),
  //     };
  //   });
  // }

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
