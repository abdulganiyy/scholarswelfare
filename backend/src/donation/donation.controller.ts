import { Controller, Get } from '@nestjs/common';
import { DonationService } from './donation.service';

@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Get('')
  getDonations() {
    return this.donationService.getDonations();
  }

  @Get('/monthly')
  getCurrentMonthlyDonationsAmount() {
    return this.donationService.getCurrentMonthlyDonationsAmount();
  }
}
