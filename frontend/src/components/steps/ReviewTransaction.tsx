import React from 'react';
import { FormData } from '@/types';

interface ReviewTransactionProps {
  formData: FormData;
  onBack: () => void;
  onConfirm: () => void;
}

const ReviewTransaction: React.FC<ReviewTransactionProps> = ({
  formData,
  onBack,
  onConfirm,
}) => {
  const formatAmount = (amount: string) => {
    const num = parseFloat(amount);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(num);
  };

  return (
    <div className="glass rounded-lg p-6 shadow-xl border border-white/10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Review Payment
        </h2>
        <p className="text-gray-400 text-sm">
          Please verify the transaction details before proceeding
        </p>
      </div>

      {/* Transaction Summary Card */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
        {/* Amount Display */}
        <div className="text-center mb-6 pb-6 border-b border-white/10">
          <p className="text-gray-400 text-sm mb-2">Payment Amount</p>
          <p className="text-4xl font-bold text-white">
            {formatAmount(formData.amount)}
          </p>
        </div>

        {/* Transaction Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-white font-bold">
                  {formData.sender_id.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-400">From</p>
                <p className="text-white font-medium">{formData.sender_id}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="text-gray-400">→</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-white font-bold">
                  {formData.receiver_id.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-400">To</p>
                <p className="text-white font-medium">{formData.receiver_id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mb-6 p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg">
        <p className="text-sm text-gray-300 mb-2">
          <span className="text-white font-semibold">🛡️ Fraud Detection Ready</span>
        </p>
        <p className="text-xs text-gray-400 leading-relaxed">
          Upon confirmation, this transaction will be analyzed using our 5-factor fraud detection system:
          amount patterns, recipient profile, transaction context, user behavior, and historical analysis.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-lg font-semibold text-white border-2 border-white/20 hover:bg-white/10 transition-all duration-200"
        >
          ← Edit Details
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-3 rounded-lg font-bold text-black bg-white hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Confirm & Process Payment
        </button>
      </div>
    </div>
  );
};

export default ReviewTransaction;
