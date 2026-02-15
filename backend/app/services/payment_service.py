"""
Payment Processing Service

Handles payment processing with integrated fraud detection.
Simulates payment execution for demonstration purposes.
"""

import uuid
import time
from datetime import datetime
from typing import Dict

from app.models.schemas import TransactionRequest, PaymentResult
from app.services.fraud_detector import FraudDetector


class PaymentService:
    """
    Service for processing payments with fraud detection.
    
    Workflow:
    1. Run fraud detection on transaction
    2. If high risk (block) -> Reject payment
    3. If low/medium risk (approve/warn) -> Process payment
    4. Return payment result with unique ID
    """
    
    _instance = None
    
    def __new__(cls):
        """Singleton pattern to maintain payment history"""
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance
    
    def __init__(self):
        """Initialize payment service with fraud detector"""
        if self._initialized:
            return
            
        self.fraud_detector = FraudDetector()
        self.payment_history: Dict[str, PaymentResult] = {}
        self._initialized = True
    
    def process_payment(self, transaction: TransactionRequest) -> PaymentResult:
        """
        Process a payment with fraud detection.
        
        Args:
            transaction: Transaction details to process
            
        Returns:
            PaymentResult with status and details
        """
        # Step 1: Run fraud detection
        fraud_check = self.fraud_detector.evaluate_transaction(
            amount=transaction.amount,
            sender_id=transaction.sender_id,
            receiver_id=transaction.receiver_id,
            timestamp=transaction.timestamp
        )
        
        # Generate unique identifiers
        payment_id = str(uuid.uuid4())
        transaction_id = f"txn_{int(time.time() * 1000)}"
        processed_at = datetime.utcnow().isoformat() + "Z"
        
        # Step 2: Determine if payment should be blocked
        if fraud_check.decision == "block":
            # High risk - reject payment
            result = PaymentResult(
                payment_id=payment_id,
                status="blocked",
                transaction_id=transaction_id,
                sender_id=transaction.sender_id,
                receiver_id=transaction.receiver_id,
                amount=transaction.amount,
                risk_score=fraud_check.risk_score,
                decision=fraud_check.decision,
                processed_at=processed_at,
                message=f"Payment rejected: {fraud_check.reason}",
                flags=fraud_check.flags
            )
        else:
            # Low or medium risk - process payment
            # Simulate payment processing delay (0.5-1 second)
            time.sleep(0.5)
            
            result = PaymentResult(
                payment_id=payment_id,
                status="success",
                transaction_id=transaction_id,
                sender_id=transaction.sender_id,
                receiver_id=transaction.receiver_id,
                amount=transaction.amount,
                risk_score=fraud_check.risk_score,
                decision=fraud_check.decision,
                processed_at=processed_at,
                message="Payment processed successfully",
                flags=fraud_check.flags if fraud_check.flags else None
            )
        
        # Store in payment history
        self.payment_history[payment_id] = result
        
        return result
    
    def get_payment(self, payment_id: str) -> PaymentResult | None:
        """
        Retrieve payment details by ID.
        
        Args:
            payment_id: Unique payment identifier
            
        Returns:
            PaymentResult if found, None otherwise
        """
        return self.payment_history.get(payment_id)
    
    def get_all_payments(self) -> list[PaymentResult]:
        """
        Get all processed payments.
        
        Returns:
            List of all payment results
        """
        return list(self.payment_history.values())
