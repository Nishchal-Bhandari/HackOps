import React from 'react';
import { PaymentResult } from '@/types';

interface PaymentBlockedProps {
  result: PaymentResult;
  onReset: () => void;
}

const PaymentBlocked: React.FC<PaymentBlockedProps> = ({ result, onReset }) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="glass rounded-lg p-6 shadow-xl border border-gray-600/50 fade-in">
      {/* Block Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center animate-scale-in">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>

      {/* Error Message */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-400 mb-2">Payment Blocked</h2>
        <p className="text-gray-500">{result.message}</p>
      </div>

      {/* Amount Display */}
      <div className="text-center mb-6 pb-6 border-b border-white/10">
        <p className="text-gray-500 text-sm mb-1">Attempted Amount</p>
        <p className="text-4xl font-bold text-gray-400">
          {formatAmount(result.amount)}
        </p>
      </div>

      {/* Risk Analysis */}
      <div className="bg-white/5 border border-gray-600/30 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-600/30 flex items-center justify-center flex-shrink-0">
            <span className="text-gray-400 text-xl">⚠</span>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-1">High Fraud Risk Detected</h4>
            <p className="text-gray-400 text-sm">
              This transaction has been flagged as high-risk and cannot be processed.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">Risk Score</span>
            <span className="text-gray-300 text-sm font-bold">
              {result.risk_score}/100
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">Decision</span>
            <span className="text-gray-300 text-sm font-semibold uppercase">
              {result.decision}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">From</span>
            <span className="text-gray-300 text-sm">{result.sender_id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">To</span>
            <span className="text-gray-300 text-sm">{result.receiver_id}</span>
          </div>
        </div>
      </div>

      {/* Risk Flags */}
      {result.flags && result.flags.length > 0 && (
        <div className="mb-6 p-4 bg-gray-600/10 border border-gray-600/30 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
            <span className="text-red-400">🚨</span>
            Fraud Indicators Detected ({result.flags.length})
          </h4>
          <p className="text-xs text-gray-500 mb-3">Multi-factor analysis flagged the following risks:</p>
          <ul className="space-y-2">
            {result.flags.map((flag, index) => (
              <li key={index} className="flex items-start gap-2 bg-white/5 p-2 rounded border-l-2 border-red-500/50">
                <span className="text-red-400 font-bold mt-0.5">!</span>
                <span className="text-gray-300 text-sm flex-1">{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Info Box */}
      <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
        <p className="text-xs text-gray-400">
          <span className="text-gray-300 font-semibold">💡 What can I do?</span>
          <br />
          Review the risk indicators above and try a different transaction. Lower amounts
          to trusted recipients are more likely to be approved.
        </p>
      </div>

      {/* Action Buttons */}
      <button
        onClick={onReset}
        className="w-full py-4 rounded-lg font-bold text-black bg-white hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Try Different Transaction
      </button>
    </div>
  );
};

export default PaymentBlocked;
