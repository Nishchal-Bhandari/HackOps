import React, { useState } from 'react';
import { FormData } from '@/types';

interface TransactionFormProps {
  onSubmit: (data: FormData) => void;
  loading: boolean;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<FormData>({
    amount: '',
    sender_id: '',
    receiver_id: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.sender_id.trim()) {
      newErrors.sender_id = 'Sender ID is required';
    }

    if (!formData.receiver_id.trim()) {
      newErrors.receiver_id = 'Receiver ID is required';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  // Pre-filled example scenarios for demo
  const loadExample = (example: 'low' | 'medium' | 'high') => {
    const examples = {
      low: {
        amount: '500',
        sender_id: 'user123',
        receiver_id: 'merchant456',
      },
      medium: {
        amount: '55000',
        sender_id: 'user789',
        receiver_id: 'vendor_xyz',
      },
      high: {
        amount: '75000',
        sender_id: 'account_001',
        receiver_id: 'flagged_account_1',
      },
    };
    setFormData(examples[example]);
    setErrors({});
  };

  return (
    <div className="glass rounded-lg p-6 shadow-xl border border-white/10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Transaction Details
        </h2>
        <p className="text-gray-400 text-sm">
          Enter transaction information for real-time fraud analysis
        </p>
      </div>

      {/* Quick Example Buttons */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => loadExample('low')}
          className="px-3 py-1.5 text-xs font-medium bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors border border-white/20"
          disabled={loading}
        >
          Low Risk Example
        </button>
        <button
          type="button"
          onClick={() => loadExample('medium')}
          className="px-3 py-1.5 text-xs font-medium bg-white/10 text-gray-200 rounded-md hover:bg-white/20 transition-colors border border-white/20"
          disabled={loading}
        >
          Medium Risk Example
        </button>
        <button
          type="button"
          onClick={() => loadExample('high')}
          className="px-3 py-1.5 text-xs font-medium bg-white/10 text-gray-300 rounded-md hover:bg-white/20 transition-colors border border-white/20"
          disabled={loading}
        >
          High Risk Example
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Sender ID */}
        <div>
          <label htmlFor="sender_id" className="block text-sm font-semibold text-gray-200 mb-2">
            Sender ID
          </label>
          <input
            type="text"
            id="sender_id"
            name="sender_id"
            value={formData.sender_id}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border-2 bg-black/40 text-white placeholder-gray-500 ${
              errors.sender_id ? 'border-gray-500' : 'border-white/20'
            } focus:border-white focus:outline-none transition-colors`}
            placeholder="e.g., user123"
            disabled={loading}
          />
          {errors.sender_id && (
            <p className="mt-1 text-sm text-gray-400">{errors.sender_id}</p>
          )}
        </div>

        {/* Receiver ID */}
        <div>
          <label htmlFor="receiver_id" className="block text-sm font-semibold text-gray-200 mb-2">
            Receiver ID
          </label>
          <input
            type="text"
            id="receiver_id"
            name="receiver_id"
            value={formData.receiver_id}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border-2 bg-black/40 text-white placeholder-gray-500 ${
              errors.receiver_id ? 'border-gray-500' : 'border-white/20'
            } focus:border-white focus:outline-none transition-colors`}
            placeholder="e.g., merchant456"
            disabled={loading}
          />
          {errors.receiver_id && (
            <p className="mt-1 text-sm text-gray-400">{errors.receiver_id}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Try: <code className="bg-white/10 px-1 rounded">flagged_account_1</code> for high-risk demo
          </p>
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-semibold text-gray-200 mb-2">
            Amount (USD)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-gray-400 font-medium">$</span>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`w-full pl-8 pr-4 py-3 rounded-lg border-2 bg-black/40 text-white placeholder-gray-500 ${
                errors.amount ? 'border-gray-500' : 'border-white/20'
              } focus:border-white focus:outline-none transition-colors`}
              placeholder="0.00"
              disabled={loading}
            />
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-gray-400">{errors.amount}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Amounts &gt; $50,000 trigger high-risk alerts
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-lg font-bold text-black text-lg transition-all duration-200 shadow-lg ${
            loading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-white hover:bg-gray-200 hover:shadow-xl transform hover:-translate-y-0.5'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Analyzing...
            </span>
          ) : (
            'Evaluate Transaction'
          )}
        </button>
      </form>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg">
        <h4 className="text-sm font-semibold text-white mb-1">
          How it works
        </h4>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>• Risk scoring based on amount, receiver status, and transaction patterns</li>
          <li>• Real-time fraud detection with ML-ready architecture</li>
          <li>• Decision: Approve (low risk) / Warn (medium) / Block (high)</li>
        </ul>
      </div>
    </div>
  );
};

export default TransactionForm;
