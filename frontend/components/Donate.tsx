"use client";

import { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Define predefined donation amounts
const SUGGESTED_AMOUNTS = [500, 1000, 5000, 10000, 20000];

export default function Donate() {
  const [donationAmount, setDonationAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [tipPercentage] = useState<number>(0);
  const [customTip] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [anonymous] = useState<boolean>(false);
  const [useCustomAmount, setUseCustomAmount] = useState<boolean>(false);
  const [useCustomTip] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success] = useState<boolean>(false);

  const finalDonationAmount = useCustomAmount
    ? Number.parseFloat(customAmount) || 0
    : donationAmount;
  const platformTip = useCustomTip
    ? Number.parseFloat(customTip) || 0
    : Math.round(((finalDonationAmount * tipPercentage) / 100) * 100) / 100;
  const totalAmount = finalDonationAmount + platformTip;

  const handlePayment = () => {
    if (!window.PaystackPop) {
      alert("Paystack failed to load");
      return;
    }

    if ((!donorName && !anonymous) || !donorEmail || finalDonationAmount <= 0) {
      setError(
        "Please fill in all required fields and enter a valid donation amount",
      );
      return;
    }

    if (!/\S+@\S+\.\S+/.test(donorEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      reference: new Date().getTime().toString(),
      email: donorEmail,
      amount: totalAmount * 100,
      metadata: { first_name: donorName },

      callback(response) {
        // console.log("Payment success:", response);

        setIsProcessing(false);
      },

      onClose() {
        console.log("Payment closed");
        setIsProcessing(false);
      },
    });

    handler.openIframe();
  };

  return (
    <section id="donate" className="border-y border-[#e8e2d8] bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Thank you for your donation!
            </h3>
            <p className="text-gray-600">
              Your ₦{finalDonationAmount.toFixed(2)} donation has been
              successfully processed.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <h3 className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span>Support Dawah Efforts</span>
            </h3>

            <p> Your donation will help in propagating sunnah</p>

            {/* Donation Amount */}
            <div>
              <Label className="text-base font-semibold">Donation Amount</Label>
              <div className="mt-3 space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  {SUGGESTED_AMOUNTS.map((amount) => (
                    <Button
                      key={amount}
                      variant={
                        !useCustomAmount && donationAmount === amount
                          ? "default"
                          : "outline"
                      }
                      onClick={() => {
                        setDonationAmount(amount);
                        setUseCustomAmount(false);
                      }}
                      className="h-12"
                      disabled={isProcessing}
                    >
                      {/* ₦{amount} */}
                      {amount.toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="custom-amount"
                    checked={useCustomAmount}
                    onCheckedChange={(checked) =>
                      setUseCustomAmount(checked as boolean)
                    }
                    disabled={isProcessing}
                  />
                  <Label htmlFor="custom-amount">Other amount</Label>
                </div>
                {useCustomAmount && (
                  <div className="relative">
                    {/* <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /> */}

                    <span className="absolute left-3 top-3.5 transform -translate-y-1/2 h-4 w-4 text-gray-400">
                      ₦
                    </span>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="pl-10"
                      min="1"
                      disabled={isProcessing}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Total Summary */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Your donation</span>
                    <span>
                      {/* ₦{finalDonationAmount.toFixed(2)} */}
                      {finalDonationAmount.toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>
                      {/* ₦{totalAmount.toFixed(2)} */}
                      {totalAmount.toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donor Information */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">
                Your Information
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Label htmlFor="donor-name">Full Name *</Label>
                  <Input
                    id="donor-name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    disabled={isProcessing}
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="donor-email">Email Address *</Label>
                  <Input
                    id="donor-email"
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={isProcessing}
                  />
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <div className="flex space-x-3">
              <Button
                onClick={handlePayment}
                className="flex-1 bg-green-600 hover:bg-green-700"
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-4 w-4" />
                    Donate{" "}
                    {totalAmount.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
