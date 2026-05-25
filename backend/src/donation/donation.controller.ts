import { Controller, Get, Query } from '@nestjs/common';
import { DonationService } from './donation.service';
import { GetDonationsDto } from './dto/get-donations.dto';

@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Get('')
  getDonations(@Query() query: GetDonationsDto) {
    return this.donationService.getDonations(query);
  }

  @Get('/monthly')
  getCurrentMonthlyDonationsAmount() {
    return this.donationService.getCurrentMonthlyDonationsAmount();
  }
}
