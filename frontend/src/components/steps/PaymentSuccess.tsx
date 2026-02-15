import React from 'react';
import { PaymentResult } from '@/types';

interface PaymentSuccessProps {
  result: PaymentResult;
  onReset: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ result, onReset }) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="glass rounded-lg p-6 shadow-xl border border-white/10 fade-in">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center animate-scale-in">
          <svg
            className="w-12 h-12 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      {/* Success Message */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
        <p className="text-gray-400">{result.message}</p>
      </div>

      {/* Amount Display */}
      <div className="text-center mb-6 pb-6 border-b border-white/10">
        <p className="text-gray-400 text-sm mb-1">Amount Paid</p>
        <p className="text-4xl font-bold text-white">
          {formatAmount(result.amount)}
        </p>
      </div>

      {/* Transaction Details */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Payment ID</span>
          <span className="text-white text-sm font-mono">
            {result.payment_id.slice(0, 8)}...
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Transaction ID</span>
          <span className="text-white text-sm font-mono">{result.transaction_id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">From</span>
          <span className="text-white text-sm">{result.sender_id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">To</span>
          <span className="text-white text-sm">{result.receiver_id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Processed At</span>
          <span className="text-white text-sm">{formatDate(result.processed_at)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Risk Score</span>
          <span className={`text-sm font-semibold ${
            result.risk_score < 40 ? 'text-white' : 'text-gray-300'
          }`}>
            {result.risk_score}/100
            <span className="ml-1 text-xs">({result.decision})</span>
          </span>
        </div>
      </div>

      {/* Fraud Check Status */}
      <div className="mb-6 p-4 bg-green-900/10 border border-green-500/20 rounded-lg">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-green-400 text-xl">✓</span>
          </div>
          <div className="flex-1">
            <h4 className="text-white font-semibold mb-1">Fraud Check Passed</h4>
            <p className="text-gray-400 text-sm">
              Transaction cleared all 5 security factors
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1.5 text-xs">
          <div className="flex items-center gap-2 text-green-400/80">
            <span className="text-green-400">✓</span>
            <span>Amount Analysis - Normal spending pattern</span>
          </div>
          <div className="flex items-center gap-2 text-green-400/80">
            <span className="text-green-400">✓</span>
            <span>Recipient Profile - Verified account</span>
          </div>
          <div className="flex items-center gap-2 text-green-400/80">
            <span className="text-green-400">✓</span>
            <span>Transaction Context - Normal activity</span>
          </div>
          <div className="flex items-center gap-2 text-green-400/80">
            <span className="text-green-400">✓</span>
            <span>User Behavior - Consistent patterns</span>
          </div>
          <div className="flex items-center gap-2 text-green-400/80">
            <span className="text-green-400">✓</span>
            <span>Historical Analysis - No anomalies</span>
          </div>
        </div>
      </div>

      {/* Risk Flags (if any) */}
      {result.flags && result.flags.length > 0 && (
        <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-200 mb-2">
            ℹ️ Risk Indicators Detected
          </h4>
          <ul className="space-y-1">
            {result.flags.map((flag, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span className="text-gray-300 text-sm">{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={onReset}
        className="w-full py-4 rounded-lg font-bold text-black bg-white hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Make Another Payment
      </button>
    </div>
  );
};

export default PaymentSuccess;
