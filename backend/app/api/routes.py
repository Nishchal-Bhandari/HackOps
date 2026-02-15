from fastapi import APIRouter, HTTPException, status
from app.models.schemas import TransactionRequest, TransactionResponse, PaymentResult
from app.services.fraud_detector import FraudDetector
from app.services.payment_service import PaymentService
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

# Singleton instances
fraud_detector = FraudDetector()
payment_service = PaymentService()


@router.post(
    "/evaluate-transaction",
    response_model=TransactionResponse,
    status_code=status.HTTP_200_OK,
    summary="Evaluate transaction for fraud risk",
    description="Analyzes a transaction and returns a risk assessment with decision (approve/warn/block)"
)
async def evaluate_transaction(transaction: TransactionRequest) -> TransactionResponse:
    """
    Evaluate a transaction for fraud risk.
    
    This endpoint performs real-time fraud detection using:
    - Amount-based risk scoring
    - Receiver account flagging
    - Transaction velocity analysis
    - Behavioral pattern detection
    
    Returns a decision (approve/warn/block) with detailed risk analysis.
    """
    try:
        logger.info(f"Evaluating transaction: {transaction.sender_id} -> {transaction.receiver_id}, ${transaction.amount}")
        
        # Perform fraud evaluation
        result = fraud_detector.evaluate_transaction(
            amount=transaction.amount,
            sender_id=transaction.sender_id,
            receiver_id=transaction.receiver_id,
            timestamp=transaction.timestamp
        )
        
        logger.info(f"Decision: {result.decision}, Risk Score: {result.risk_score}")
        
        return result
        
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid transaction data: {str(e)}"
        )
    
    except Exception as e:
        logger.error(f"Unexpected error during fraud evaluation: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during fraud evaluation. Please try again."
        )


@router.post(
    "/process-payment",
    response_model=PaymentResult,
    status_code=status.HTTP_200_OK,
    summary="Process payment with fraud detection",
    description="Processes a payment transaction with integrated fraud detection. Approves low/medium risk, blocks high risk."
)
async def process_payment(transaction: TransactionRequest) -> PaymentResult:
    """
    Process a payment transaction with fraud detection.
    
    This endpoint performs the complete payment flow:
    1. Runs fraud detection on the transaction
    2. If high risk (block) -> Rejects payment immediately
    3. If low/medium risk (approve/warn) -> Processes payment
    4. Returns payment result with unique payment ID
    
    The payment process includes:
    - Real-time fraud risk assessment
    - Automatic blocking of high-risk transactions
    - Payment processing simulation
    - Unique payment ID generation
    - Transaction history tracking
    """
    try:
        logger.info(f"Processing payment: {transaction.sender_id} -> {transaction.receiver_id}, ${transaction.amount}")
        
        # Process payment (includes fraud detection)
        result = payment_service.process_payment(transaction)
        
        logger.info(f"Payment {result.payment_id}: {result.status}, Risk Score: {result.risk_score}")
        
        return result
        
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid transaction data: {str(e)}"
        )
    
    except Exception as e:
        logger.error(f"Unexpected error during payment processing: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during payment processing. Please try again."
        )


@router.get(
    "/flagged-accounts",
    summary="Get list of flagged accounts",
    description="Returns the list of receiver accounts currently flagged as high-risk"
)
async def get_flagged_accounts():
    """Return list of flagged accounts (for testing/demo purposes)"""
    return {
        "flagged_accounts": list(fraud_detector.get_flagged_accounts()),
        "count": len(fraud_detector.get_flagged_accounts())
    }
