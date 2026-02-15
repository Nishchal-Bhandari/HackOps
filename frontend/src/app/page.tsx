'use client';

import { useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import EnterDetails from '@/components/steps/EnterDetails';
import ReviewTransaction from '@/components/steps/ReviewTransaction';
import ProcessingPayment from '@/components/steps/ProcessingPayment';
import PaymentSuccess from '@/components/steps/PaymentSuccess';
import PaymentBlocked from '@/components/steps/PaymentBlocked';
import { FormData, ProcessingStep, PaymentResult, TransactionData } from '@/types';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<ProcessingStep>(1);
  const [formData, setFormData] = useState<FormData>({
    sender_id: '',
    receiver_id: '',
    amount: '',
  });
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDetailsNext = (data: FormData) => {
    console.log('🟢 handleDetailsNext called with:', data);
    setFormData(data);
    console.log('🟢 Moving from step 1 to step 2');
    setCurrentStep(2);
  };

  const handleReviewBack = () => {
    console.log('🔙 Going back to step 1');
    setCurrentStep(1);
  };

  const handleReviewConfirm = () => {
    setCurrentStep(3);
  };

  const handlePaymentComplete = (result: PaymentResult) => {
    console.log('🟢 handlePaymentComplete called with:', result);
    setPaymentResult(result);
    setCurrentStep(4);
    console.log('🟢 Updated to step 4');
  };

  const handlePaymentError = (errorMessage: string) => {
    console.error('🔴 handlePaymentError called:', errorMessage);
    setError(errorMessage);
    // Could show error state or go back to step 1
    setCurrentStep(1);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setFormData({
      sender_id: '',
      receiver_id: '',
      amount: '',
    });
    setPaymentResult(null);
    setError(null);
  };

  // Convert FormData to TransactionData for API
  const getTransactionData = (): TransactionData => ({
    amount: parseFloat(formData.amount),
    sender_id: formData.sender_id,
    receiver_id: formData.receiver_id,
    timestamp: new Date().toISOString(),
  });

  return (
    <main className="min-h-screen gradient-bg py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 fade-in">
          <div className="inline-block mb-4">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <span className="text-white text-sm font-semibold tracking-wide">VexStorm&apos;26 - Capital-Core Track [v2.0]</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg tracking-tight">
            Payment Processing System
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Secure payment processing with <span className="text-white font-semibold">5-factor fraud detection</span>
          </p>
          <div className="mt-3 text-sm text-gray-400">
            AI-powered analysis: Amount • Recipient • Context • Behavior • History
          </div>
        </header>

        {/* Error Display (if any) */}
        {error && (
          <div className="mb-6 bg-gray-600/20 border border-gray-600/50 rounded-lg p-4 fade-in">
            <div className="flex items-start gap-3">
              <div className="bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                !
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-300 mb-1">Error</h3>
                <p className="text-gray-400">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} />

        {/* Step Content */}
        <div className="mt-8">
          {console.log('🎯 Current Step:', currentStep, 'Payment Result:', paymentResult)}
          
          {currentStep === 1 && (
            <EnterDetails formData={formData} onNext={handleDetailsNext} />
          )}

          {currentStep === 2 && (
            <ReviewTransaction
              formData={formData}
              onBack={handleReviewBack}
              onConfirm={handleReviewConfirm}
            />
          )}

          {currentStep === 3 && (
            <ProcessingPayment
              transactionData={getTransactionData()}
              onComplete={handlePaymentComplete}
              onError={handlePaymentError}
            />
          )}

          {currentStep === 4 && paymentResult && (
            <>
              {paymentResult.status === 'success' ? (
                <PaymentSuccess result={paymentResult} onReset={handleReset} />
              ) : (
                <PaymentBlocked result={paymentResult} onReset={handleReset} />
              )}
            </>
          )}
          
          {currentStep === 4 && !paymentResult && (
            <div className="glass rounded-lg p-8 text-center border border-white/10">
              <p className="text-white">Loading payment result...</p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid gap-6 md:grid-cols-3 fade-in">
          <div className="glass rounded-lg p-6 text-center border border-white/10 hover:border-white/20 transition-all">
            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
              💳
            </div>
            <h3 className="font-bold text-white mb-2">Secure Payments</h3>
            <p className="text-sm text-gray-400">
              End-to-end payment processing with built-in fraud prevention
            </p>
          </div>
          <div className="glass rounded-lg p-6 text-center border border-white/10 hover:border-white/20 transition-all">
            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
              🛡️
            </div>
            <h3 className="font-bold text-white mb-2">Real-Time Protection</h3>
            <p className="text-sm text-gray-400">
              Instant fraud detection blocks high-risk transactions automatically
            </p>
          </div>
          <div className="glass rounded-lg p-6 text-center border border-white/10 hover:border-white/20 transition-all">
            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
              ⚡
            </div>
            <h3 className="font-bold text-white mb-2">Fast Processing</h3>
            <p className="text-sm text-gray-400">
              Complete payment flow in seconds with detailed confirmations
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Built for VexStorm&apos;26 Hackathon | Capital-Core Track: Fraud Detection & Payment Processing
          </p>
          <div className="mt-2 flex gap-4 justify-center">
            <a
              href="http://localhost:8000/docs"
              className="hover:text-white transition-colors underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              API Documentation
            </a>
            <span>•</span>
            <span className="text-gray-600">Step {currentStep} of 4</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
