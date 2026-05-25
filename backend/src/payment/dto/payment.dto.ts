import { IsEmail } from 'class-validator';

export class PaymentDto {
  @IsEmail()
  signature!: string;
}
