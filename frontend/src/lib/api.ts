import { TransactionData, TransactionResponse, PaymentResult } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Evaluate a transaction for fraud risk
 */
export async function evaluateTransaction(
  data: TransactionData
): Promise<TransactionResponse> {
  const response = await fetch(`${API_URL}/api/evaluate-transaction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.detail || `API Error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Get list of flagged accounts
 */
export async function getFlaggedAccounts(): Promise<string[]> {
  const response = await fetch(`${API_URL}/api/flagged-accounts`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch flagged accounts');
  }
  
  const data = await response.json();
  return data.flagged_accounts || [];
}

/**
 * Process a payment transaction with fraud detection
 */
export async function processPayment(
  data: TransactionData
): Promise<PaymentResult> {
  const response = await fetch(`${API_URL}/api/process-payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.detail || `Payment Error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Health check
 */
export async function checkHealth(): Promise<{ status: string }> {
  const response = await fetch(`${API_URL}/health`);
  return response.json();
}
