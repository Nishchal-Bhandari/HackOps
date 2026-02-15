from pydantic import BaseModel, Field, validator
from typing import Literal, Optional
from datetime import datetime


class TransactionRequest(BaseModel):
    """Request model for transaction evaluation"""
    
    amount: float = Field(..., gt=0, description="Transaction amount in USD")
    sender_id: str = Field(..., min_length=1, description="Sender account identifier")
    receiver_id: str = Field(..., min_length=1, description="Receiver account identifier")
    timestamp: str = Field(..., description="Transaction timestamp in ISO format")
    
    @validator('amount')
    def amount_must_be_reasonable(cls, v):
        if v > 1000000:
            raise ValueError('Amount exceeds maximum limit of $1,000,000')
        return v
    
    class Config:
        json_schema_extra = {
            "example": {
                "amount": 15000.00,
                "sender_id": "user123",
                "receiver_id": "merchant456",
                "timestamp": "2026-02-15T10:30:00Z"
            }
        }


class TransactionResponse(BaseModel):
    """Response model for transaction evaluation"""
    
    decision: Literal["approve", "warn", "block"] = Field(
        ..., description="Transaction decision"
    )
    reason: str = Field(..., description="Human-readable explanation")
    risk_score: int = Field(..., ge=0, le=100, description="Risk score from 0-100")
    risk_level: Literal["low", "medium", "high"] = Field(
        ..., description="Risk level classification"
    )
    flags: list[str] = Field(default_factory=list, description="List of risk indicators")
    
    class Config:
        json_schema_extra = {
            "example": {
                "decision": "block",
                "reason": "High-value transaction to flagged account",
                "risk_score": 90,
                "risk_level": "high",
                "flags": [
                    "High transaction amount (>$50,000)",
                    "Receiver account flagged in database"
                ]
            }
        }


class PaymentResult(BaseModel):
    """Response model for payment processing"""
    
    payment_id: str = Field(..., description="Unique payment identifier (UUID)")
    status: Literal["success", "blocked"] = Field(..., description="Payment processing status")
    transaction_id: str = Field(..., description="Transaction identifier")
    sender_id: str = Field(..., description="Sender account identifier")
    receiver_id: str = Field(..., description="Receiver account identifier")
    amount: float = Field(..., description="Transaction amount in USD")
    risk_score: int = Field(..., ge=0, le=100, description="Fraud risk score")
    decision: Literal["approve", "warn", "block"] = Field(..., description="Fraud detection decision")
    processed_at: str = Field(..., description="Payment processing timestamp (ISO format)")
    message: str = Field(..., description="Human-readable status message")
    flags: Optional[list[str]] = Field(default=None, description="Risk flags (if any)")
    
    class Config:
        json_schema_extra = {
            "example": {
                "payment_id": "550e8400-e29b-41d4-a716-446655440000",
                "status": "success",
                "transaction_id": "txn_1234567890",
                "sender_id": "user123",
                "receiver_id": "merchant456",
                "amount": 15000.00,
                "risk_score": 25,
                "decision": "approve",
                "processed_at": "2026-02-15T10:30:45Z",
                "message": "Payment processed successfully",
                "flags": []
            }
        }
