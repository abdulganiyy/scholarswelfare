declare global {
  interface Window {
    PaystackPop: {
      setup(options: {
        reference: string;
        key: string;
        email: string;
        amount: number;
        currency?: string;
        ref?: string;
        callback?: (response: any) => void;
        onClose?: () => void;
        metadata?: Record<string, any>;
      }): {
        openIframe(): void;
      };
    };
  }
}

export {};
