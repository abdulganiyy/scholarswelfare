import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaymentService {
  private baseUrl = 'https://api.paystack.co';
  private secretKey = process.env.PAYSTACK_SECRET_TEST_KEY;

  async initializePayment({
    email,
    amount,
    reference,
    callback_url,
    metadata,
  }: {
    email: string;
    amount: number;
    reference: string;
    callback_url?: string;
    metadata?: string;
  }) {
    const res = await axios.post(
      `${this.baseUrl}/transaction/initialize`,
      {
        email,
        amount, // kobo
        reference,
        callback_url,
        metadata,
      },
      {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      },
    );

    return res.data.data; // authorization_url, access_code
  }
}
