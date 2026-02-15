import React from 'react';
import { TransactionResponse } from '@/types';

interface RiskDisplayProps {
  result: TransactionResponse;
  onReset: () => void;
}

const RiskDisplay: React.FC<RiskDisplayProps> = ({ result, onReset }) => {
  // Determine color scheme based on decision
  const getDecisionStyle = () => {
    switch (result.decision) {
      case 'approve':
        return {
          bg: 'bg-white/5',
          border: 'border-white',
          text: 'text-white',
          badge: 'bg-white',
          badgeText: 'text-black',
          icon: '✓',
        };
      case 'warn':
        return {
          bg: 'bg-white/5',
          border: 'border-gray-400',
          text: 'text-gray-300',
          badge: 'bg-gray-400',
          badgeText: 'text-black',
          icon: '⚠',
        };
      case 'block':
        return {
          bg: 'bg-white/5',
          border: 'border-gray-600',
          text: 'text-gray-500',
          badge: 'bg-gray-600',
          badgeText: 'text-white',
          icon: '✕',
        };
      default:
        return {
          bg: 'bg-white/5',
          border: 'border-gray-500',
          text: 'text-gray-400',
          badge: 'bg-gray-500',
          badgeText: 'text-white',
          icon: '?',
        };
    }
  };

  const getRiskLevelBadge = () => {
    switch (result.risk_level) {
      case 'low':
        return <span className="px-3 py-1 bg-white/20 text-white border border-white/30 rounded-full text-sm font-semibold">Low Risk</span>;
      case 'medium':
        return <span className="px-3 py-1 bg-white/10 text-gray-300 border border-gray-400/30 rounded-full text-sm font-semibold">Medium Risk</span>;
      case 'high':
        return <span className="px-3 py-1 bg-white/5 text-gray-500 border border-gray-600/30 rounded-full text-sm font-semibold">High Risk</span>;
    }
  };

  const style = getDecisionStyle();

  return (
    <div className={`${style.bg} border-2 ${style.border} rounded-lg p-6 fade-in`}>
      {/* Decision Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`${style.badge} ${style.badgeText} w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold`}>
            {style.icon}
          </div>
          <div>
            <h3 className={`text-2xl font-bold ${style.text} uppercase`}>
              {result.decision}
            </h3>
            <div className="mt-1">
              {getRiskLevelBadge()}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400 font-medium">Risk Score</div>
          <div className={`text-3xl font-bold ${style.text}`}>
            {result.risk_score}
            <span className="text-lg">/100</span>
          </div>
        </div>
      </div>

      {/* Risk Score Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden border border-white/20">
          <div
            className={`${style.badge} h-3 transition-all duration-1000 ease-out`}
            style={{ width: `${result.risk_score}%` }}
          ></div>
        </div>
      </div>

      {/* Reason */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-200 mb-2">Analysis</h4>
        <p className={`${style.text} text-base font-medium`}>
          {result.reason}
        </p>
      </div>

      {/* Risk Flags */}
      {result.flags && result.flags.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-200 mb-2">Risk Indicators</h4>
          <ul className="space-y-2">
            {result.flags.map((flag, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className={`${style.text} mt-1`}>•</span>
                <span className="text-gray-300">{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={onReset}
        className="w-full mt-4 bg-white hover:bg-gray-200 text-black font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Evaluate Another Transaction
      </button>
    </div>
  );
};

export default RiskDisplay;
