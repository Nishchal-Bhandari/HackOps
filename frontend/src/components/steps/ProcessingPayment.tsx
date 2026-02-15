import React, { useEffect, useState } from 'react';
import { TransactionData, PaymentResult } from '@/types';
import { processPayment } from '@/lib/api';

interface ProcessingPaymentProps {
  transactionData: TransactionData;
  onComplete: (result: PaymentResult) => void;
  onError: (error: string) => void;
}

const ProcessingPayment: React.FC<ProcessingPaymentProps> = ({
  transactionData,
  onComplete,
  onError,
}) => {
  const [status, setStatus] = useState<string>('Running fraud detection...');

  useEffect(() => {
    const processTransaction = async () => {
      try {
        console.log('🔵 Starting payment processing...', transactionData);
        
        // Phase 1: Fraud detection
        setStatus('Running fraud detection...');
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Phase 2: Processing payment
        setStatus('Processing payment...');
        
        console.log('🔵 Calling API: /api/process-payment');
        const result = await processPayment(transactionData);
        console.log('✅ API Response received:', result);
        
        // Brief delay to show success message
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        console.log('🔵 Calling onComplete with result');
        onComplete(result);
      } catch (error) {
        console.error('❌ Payment processing error:', error);
        onError(error instanceof Error ? error.message : 'Payment processing failed');
      }
    };

    processTransaction();
  }, [transactionData, onComplete, onError]);

  return (
    <div className="glass rounded-lg p-8 shadow-xl border border-white/10">
      <div className="flex flex-col items-center justify-center py-8">
        {/* Animated Spinner */}
        <div className="relative mb-6">
          <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white/10 border-b-white rounded-full animate-spin animation-delay-150"></div>
          </div>
        </div>

        {/* Status Text */}
        <h3 className="text-xl font-bold text-white mb-2">{status}</h3>
        <p className="text-gray-400 text-sm text-center max-w-md">
          Analyzing transaction across 5 security factors...
        </p>

        {/* Progress Indicators - 5 Factor Analysis */}
        <div className="mt-8 space-y-2.5 w-full max-w-md">
          <div className="text-xs text-gray-500 font-semibold mb-3">Multi-Factor Fraud Detection:</div>
          
          <div className="flex items-center gap-3 bg-white/5 p-2 rounded border-l-2 border-white/20">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <span className="text-sm text-gray-300">Transaction Amount Analysis</span>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 p-2 rounded border-l-2 border-white/20">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse animation-delay-100"></div>
            <span className="text-sm text-gray-300">Recipient Profile Check</span>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 p-2 rounded border-l-2 border-white/20">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse animation-delay-200"></div>
            <span className="text-sm text-gray-300">Transaction Context Review</span>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 p-2 rounded border-l-2 border-white/20">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse animation-delay-300"></div>
            <span className="text-sm text-gray-300">User Behavior Patterns</span>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 p-2 rounded border-l-2 border-white/20">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse animation-delay-400"></div>
            <span className="text-sm text-gray-300">Historical Data Analysis</span>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 p-2 rounded border-l-2 border-green-500/50 mt-4">
            <div className={`w-2 h-2 rounded-full ${status.includes('Processing') ? 'bg-green-400 animate-pulse' : 'bg-white/30'}`}></div>
            <span className={`text-sm ${status.includes('Processing') ? 'text-green-300' : 'text-gray-500'}`}>
              Finalizing Payment
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingPayment;
