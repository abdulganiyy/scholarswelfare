import { Controller, Req, Res, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PrismaService } from '../prisma.service';
import { DonationGateway } from '../donation/donation.gateway';
import { ConfigService } from '@nestjs/config';
const crypto = require('crypto');

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private prismaService: PrismaService,
    private donationGateway: DonationGateway,
    private configService: ConfigService,
  ) {}

  @Post('verify')
  async verify(@Req() req: Request, @Res() res: Response) {
    const hash = crypto
      .createHmac('sha512', this.configService.get('PAYSTACK_SECRET_KEY'))
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash == req.headers['x-paystack-signature']) {
      // Retrieve the request's body
      const event: any = req.body;
      // Do something with event
      console.log(event);
      if (
        event.event == 'charge.success' ||
        event.event == 'transfer.success'
      ) {
        const data = event.data;

        const existingDonation = await this.prismaService.donation.findUnique({
          where: {
            reference: data.reference as string,
          },
        });

        if (existingDonation) return { message: 'success' };

        const donation = await this.prismaService.donation.create({
          data: {
            amount: data.amount as number,
            reference: data.reference as string,
            donorName: data.metadata.first_name as string,
          },
        });

        this.donationGateway.server.emit('new-donation', {
          name: donation.donorName,
          amount: `₦${donation.amount.toLocaleString()}`,
          time: new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'medium',
          }).format(donation.createdAt),
        });
      }
    }

    return { message: 'success' };
  }
}
