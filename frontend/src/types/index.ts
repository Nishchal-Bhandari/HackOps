export interface TransactionData {
  amount: number;
  sender_id: string;
  receiver_id: string;
  timestamp: string;
}

export interface TransactionResponse {
  decision: "approve" | "warn" | "block";
  reason: string;
  risk_score: number;
  risk_level: "low" | "medium" | "high";
  flags: string[];
}

export interface FormData {
  amount: string;
  sender_id: string;
  receiver_id: string;
}

export interface PaymentResult {
  payment_id: string;
  status: "success" | "blocked";
  transaction_id: string;
  sender_id: string;
  receiver_id: string;
  amount: number;
  risk_score: number;
  decision: "approve" | "warn" | "block";
  processed_at: string;
  message: string;
  flags?: string[] | null;
}

export type ProcessingStep = 1 | 2 | 3 | 4;
