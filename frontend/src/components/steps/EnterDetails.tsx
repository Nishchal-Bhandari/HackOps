import React, { useState } from 'react';
import { FormData } from '@/types';

interface EnterDetailsProps {
  formData: FormData;
  onNext: (data: FormData) => void;
}

const EnterDetails: React.FC<EnterDetailsProps> = ({ formData: initialData, onNext }) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const loadExample = (type: 'low' | 'high') => {
    const now = new Date();
    
    if (type === 'low') {
      // Low Risk: Normal amount, trusted recipient, regular hours
      setFormData({
        sender_id: 'alice',
        receiver_id: 'bob',
        amount: '100.00',
      });
    } else {
      // High Risk: High amount, flagged account, suspicious patterns
      // Backend will detect multiple factors:
      // - Large transaction amount (>$50K)
      // - Flagged receiver account
      // - New/unusual recipient
      // - Statistical outlier
      setFormData({
        sender_id: 'user123',
        receiver_id: 'flagged_account_1',
        amount: '75000.00',
      });
    }
    setErrors({});
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.sender_id.trim()) {
      newErrors.sender_id = 'Sender ID is required';
    }

    if (!formData.receiver_id.trim()) {
      newErrors.receiver_id = 'Receiver ID is required';
    }

    const amountValue = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amountValue) || amountValue <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    console.log('🔍 Validation results:', { 
      formData, 
      errors: newErrors, 
      isValid: Object.keys(newErrors).length === 0 
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔵 Form submitted with data:', formData);
    console.log('🔵 Validating form...');
    
    if (validate()) {
      console.log('✅ Validation passed! Moving to next step...');
      onNext(formData);
    } else {
      console.log('❌ Validation failed. Errors:', errors);
    }
  };

  return (
    <div className="glass rounded-lg p-6 shadow-xl border border-white/10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Enter Payment Details
        </h2>
        <p className="text-gray-400 text-sm">
          Fill in the transaction information to initiate payment
        </p>
      </div>

      {/* Quick Example Buttons */}
      <div className="mb-6 space-y-3">
        <p className="text-xs text-gray-400 font-medium">Try Multi-Factor Fraud Detection:</p>
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => loadExample('low')}
            className="px-4 py-2 text-sm font-medium bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all border border-white/20 hover:scale-105"
            title="Normal amount, trusted recipient"
          >
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <div className="text-left">
                <div className="font-semibold">Low Risk Example</div>
                <div className="text-xs text-gray-400">Normal patterns detected</div>
              </div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => loadExample('high')}
            className="px-4 py-2 text-sm font-medium bg-red-900/20 text-red-300 rounded-lg hover:bg-red-900/30 transition-all border border-red-500/30 hover:scale-105"
            title="High amount, flagged recipient, multiple risk factors"
          >
            <div className="flex items-center gap-2">
              <span className="text-red-400">⚠</span>
              <div className="text-left">
                <div className="font-semibold">High Risk Example</div>
                <div className="text-xs text-red-400/80">Multiple fraud indicators</div>
              </div>
            </div>
          </button>
        </div>
        <div className="text-xs text-gray-500 bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="font-semibold text-gray-400 mb-1">5 Risk Factors Analyzed:</div>
          <div className="grid grid-cols-1 gap-1">
            <div>• Transaction Amount (deviation from user average)</div>
            <div>• Recipient Profile (flagged/new accounts)</div>
            <div>• Transaction Context (time, patterns)</div>
            <div>• User Behavior (velocity, frequency)</div>
            <div>• Historical Patterns (spending changes)</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="e.g., alice"
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
            placeholder="e.g., bob"
          />
          {errors.receiver_id && (
            <p className="mt-1 text-sm text-gray-400">{errors.receiver_id}</p>
          )}
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
            />
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-gray-400">{errors.amount}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          onClick={() => console.log('🔴 BUTTON CLICKED!')}
          className="w-full py-4 rounded-lg font-bold text-black text-lg transition-all duration-200 shadow-lg bg-white hover:bg-gray-200 hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Continue to Review →
        </button>
      </form>
    </div>
  );
};

export default EnterDetails;
