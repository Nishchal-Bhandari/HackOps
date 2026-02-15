from datetime import datetime, timedelta
from typing import List, Dict
from statistics import mean, stdev
from app.models.schemas import TransactionRequest, TransactionResponse


class FraudDetector:
    """
    Advanced fraud detection service with multi-factor risk analysis.
    Factors: Amount patterns, recipient profiling, context analysis, 
    behavior signals, and historical deviation detection.
    """
    
    def __init__(self):
        # Simulated database of flagged accounts
        self.flagged_receivers = {
            "flagged_account_1",
            "flagged_account_2", 
            "suspicious_merchant",
            "blocked_user_999"
        }
        
        # In-memory transaction history
        # Format: {"sender_id": [{"timestamp": datetime, "amount": float, "receiver_id": str}, ...]}
        self.transaction_history: Dict[str, List[Dict]] = {}
        
        # Track known receiver relationships per sender
        # Format: {"sender_id": {"receiver_id": count}}
        self.receiver_relationships: Dict[str, Dict[str, int]] = {}
    
    def evaluate_transaction(self, amount: float, sender_id: str, receiver_id: str, timestamp: str) -> TransactionResponse:
        """
        Comprehensive fraud evaluation using multiple risk factors.
        
        Risk Factors:
        1. Transaction Amount - Deviation from user's normal spending
        2. Recipient Profile - New or flagged receivers
        3. Transaction Context - Time of day, patterns
        4. User Behavior Signals - Sudden pattern changes
        5. Historical Patterns - Spending history analysis
        
        Args:
            transaction: Transaction details to evaluate
            
        Returns:
            TransactionResponse with decision and risk analysis
        """
        score = 0
        flags = []
        
        # FACTOR 1: Transaction Amount Analysis
        amount_risk, amount_flags = self._analyze_transaction_amount(
            sender_id, 
            amount
        )
        score += amount_risk
        flags.extend(amount_flags)
        
        # FACTOR 2: Recipient Profile Analysis
        recipient_risk, recipient_flags = self._analyze_recipient_profile(
            sender_id,
            receiver_id
        )
        score += recipient_risk
        flags.extend(recipient_flags)
        
        # FACTOR 3: Transaction Context (Time, Device, Location patterns)
        context_risk, context_flags = self._analyze_transaction_context(
            timestamp
        )
        score += context_risk
        flags.extend(context_flags)
        
        # FACTOR 4: User Behavior Signals (Velocity, Frequency)
        behavior_risk, behavior_flags = self._analyze_user_behavior(
            sender_id,
            timestamp
        )
        score += behavior_risk
        flags.extend(behavior_flags)
        
        # FACTOR 5: Historical Pattern Deviation
        history_risk, history_flags = self._analyze_historical_deviation(
            sender_id,
            amount
        )
        score += history_risk
        flags.extend(history_flags)
        
        # SPECIAL CHECKS
        # Self-transfer detection
        if sender_id == receiver_id:
            score += 25
            flags.append("Self-transfer detected (unusual pattern)")
        
        # Round number pattern
        if amount % 1000 == 0 and amount > 0:
            score += 5
            flags.append("Round number amount (minor indicator)")
        
        # Store transaction in history
        self._store_transaction(sender_id, receiver_id, amount, timestamp)
        
        # Determine final decision
        decision, risk_level, reason = self._determine_decision(score, flags)
        
        return TransactionResponse(
            decision=decision,
            reason=reason,
            risk_score=min(score, 100),  # Cap at 100
            risk_level=risk_level,
            flags=flags if flags else ["No risk indicators detected - transaction appears normal"]
        )
    
    # ========== RISK FACTOR 1: Transaction Amount Analysis ==========
    def _analyze_transaction_amount(self, sender_id: str, amount: float) -> tuple:
        """
        Analyze if transaction amount is unusual for this user.
        Compares to user's historical spending patterns.
        """
        risk_score = 0
        flags = []
        
        # Get user's transaction history
        user_history = self.transaction_history.get(sender_id, [])
        
        if len(user_history) >= 3:
            # Calculate average and deviation
            past_amounts = [tx["amount"] for tx in user_history]
            avg_amount = mean(past_amounts)
            
            # Check if significantly higher than average
            if amount > avg_amount * 5:  # 5x average
                risk_score += 35
                flags.append(f"Amount ${amount:,.2f} is 5x higher than user's average ${avg_amount:,.2f}")
            elif amount > avg_amount * 3:  # 3x average
                risk_score += 20
                flags.append(f"Amount ${amount:,.2f} is 3x higher than user's average ${avg_amount:,.2f}")
            
            # Check for statistical outlier (if enough data)
            if len(past_amounts) >= 5:
                try:
                    std_dev = stdev(past_amounts)
                    if amount > avg_amount + (3 * std_dev):
                        risk_score += 15
                        flags.append("Amount is statistical outlier (3+ standard deviations)")
                except:
                    pass  # Not enough variance
        else:
            # New user or limited history - check absolute thresholds
            if amount > 50000:
                risk_score += 30
                flags.append(f"High-value transaction (${amount:,.2f}) with limited user history")
            elif amount > 10000:
                risk_score += 10
                flags.append(f"Moderate-value transaction (${amount:,.2f}) with limited user history")
        
        return risk_score, flags
    
    # ========== RISK FACTOR 2: Recipient Profile Analysis ==========
    def _analyze_recipient_profile(self, sender_id: str, receiver_id: str) -> tuple:
        """
        Analyze recipient profile: flagged accounts, new receivers, relationship history.
        """
        risk_score = 0
        flags = []
        
        # Check if receiver is flagged
        if receiver_id in self.flagged_receivers:
            risk_score += 50
            flags.append(f"Receiver '{receiver_id}' is flagged as high-risk in system database")
        
        # Initialize relationship tracking if needed
        if sender_id not in self.receiver_relationships:
            self.receiver_relationships[sender_id] = {}
        
        # Check if this is a new/unseen receiver
        if receiver_id not in self.receiver_relationships[sender_id]:
            # New receiver
            total_receivers = len(self.receiver_relationships[sender_id])
            
            if total_receivers >= 5:
                # User has established patterns - new receiver is moderate risk
                risk_score += 15
                flags.append(f"Payment to new recipient (user typically sends to {total_receivers} known recipients)")
            elif total_receivers >= 2:
                risk_score += 8
                flags.append("Payment to new recipient")
        else:
            # Known receiver - low risk indicator
            transaction_count = self.receiver_relationships[sender_id][receiver_id]
            if transaction_count >= 5:
                # Frequent recipient - reduce risk slightly (but don't go negative)
                pass  # Trusted relationship
        
        return risk_score, flags
    
    # ========== RISK FACTOR 3: Transaction Context Analysis ==========
    def _analyze_transaction_context(self, timestamp_str: str) -> tuple:
        """
        Analyze transaction timing and context.
        Suspicious times: Late night (2-6 AM), unusual patterns.
        """
        risk_score = 0
        flags = []
        
        try:
            timestamp = datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))
            hour = timestamp.hour
            
            # Late night transactions (2 AM - 6 AM) are higher risk
            if 2 <= hour < 6:
                risk_score += 20
                flags.append(f"Transaction initiated at unusual time ({hour:02d}:00 - early morning)")
            # Very early or very late (midnight - 2 AM, 10 PM - midnight)
            elif (0 <= hour < 2) or (22 <= hour < 24):
                risk_score += 10
                flags.append(f"Transaction initiated at late/early hours ({hour:02d}:00)")
            
            # Weekend pattern check (could add if needed)
            # weekday = timestamp.weekday()
            # if weekday >= 5:  # Saturday=5, Sunday=6
            #     flags.append("Weekend transaction")
                
        except ValueError:
            # Invalid timestamp - minor risk flag
            risk_score += 5
            flags.append("Invalid or malformed timestamp")
        
        return risk_score, flags
    
    # ========== RISK FACTOR 4: User Behavior Signals ==========
    def _analyze_user_behavior(self, sender_id: str, timestamp_str: str) -> tuple:
        """
        Analyze user behavior: transaction velocity, frequency changes, burst patterns.
        """
        risk_score = 0
        flags = []
        
        # Velocity check - rapid succession of transactions
        recent_count = self._count_recent_transactions(sender_id, timestamp_str, hours=1)
        
        if recent_count >= 5:
            risk_score += 35
            flags.append(f"Extremely high velocity: {recent_count} transactions in past hour")
        elif recent_count >= 3:
            risk_score += 25
            flags.append(f"High transaction velocity: {recent_count} transactions in past hour")
        elif recent_count >= 2:
            risk_score += 12
            flags.append(f"Elevated transaction frequency: {recent_count} transactions in past hour")
        
        # Check for burst patterns (many transactions in short time vs typical)
        user_history = self.transaction_history.get(sender_id, [])
        if len(user_history) >= 10:
            # Compare recent activity to historical average
            daily_count = self._count_recent_transactions(sender_id, timestamp_str, hours=24)
            if daily_count >= 10:
                risk_score += 15
                flags.append(f"Unusual transaction burst: {daily_count} transactions today")
        
        return risk_score, flags
    
    # ========== RISK FACTOR 5: Historical Pattern Deviation ==========
    def _analyze_historical_deviation(self, sender_id: str, amount: float) -> tuple:
        """
        Analyze deviation from user's established spending patterns.
        """
        risk_score = 0
        flags = []
        
        user_history = self.transaction_history.get(sender_id, [])
        
        if len(user_history) >= 5:
            past_amounts = [tx["amount"] for tx in user_history]
            
            # Calculate spending pattern
            avg_amount = mean(past_amounts)
            max_amount = max(past_amounts)
            
            # Check for sudden increase in spending
            if amount > max_amount * 2:
                risk_score += 20
                flags.append(f"Amount ${amount:,.2f} is 2x higher than user's previous maximum ${max_amount:,.2f}")
            
            # Check consistency - if user typically does small transactions
            if avg_amount < 500 and amount > 5000:
                risk_score += 15
                flags.append("Sudden shift from small to large transactions (behavior change)")
            
            # Analyze transaction frequency deviation
            # (This could be enhanced with more sophisticated time-series analysis)
            
        return risk_score, flags
    
    # ========== Helper Methods ==========
    def _count_recent_transactions(self, sender_id: str, current_timestamp: str, hours: int = 1) -> int:
        """Count transactions from sender in the specified time window"""
        if sender_id not in self.transaction_history:
            return 0
        
        try:
            current_time = datetime.fromisoformat(current_timestamp.replace('Z', '+00:00'))
        except ValueError:
            return 0
        
        time_ago = current_time - timedelta(hours=hours)
        
        recent_count = sum(
            1 for tx in self.transaction_history[sender_id]
            if tx["timestamp"] > time_ago
        )
        
        return recent_count
    
    def _store_transaction(self, sender_id: str, receiver_id: str, amount: float, timestamp: str):
        """Store transaction in history and update relationship tracking"""
        try:
            parsed_timestamp = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
        except ValueError:
            parsed_timestamp = datetime.now()
        
        # Store in transaction history
        if sender_id not in self.transaction_history:
            self.transaction_history[sender_id] = []
        
        self.transaction_history[sender_id].append({
            "timestamp": parsed_timestamp,
            "amount": amount,
            "receiver_id": receiver_id
        })
        
        # Update receiver relationship tracking
        if sender_id not in self.receiver_relationships:
            self.receiver_relationships[sender_id] = {}
        
        if receiver_id not in self.receiver_relationships[sender_id]:
            self.receiver_relationships[sender_id][receiver_id] = 0
        
        self.receiver_relationships[sender_id][receiver_id] += 1
        
        # Keep only last 100 transactions per sender to prevent memory issues
        if len(self.transaction_history[sender_id]) > 100:
            self.transaction_history[sender_id] = \
                self.transaction_history[sender_id][-100:]
    
    def _determine_decision(self, score: int, flags: List[str]) -> tuple:
        """
        Convert risk score to decision and explanation.
        
        Decision thresholds:
        - 0-39: Approve (low risk)
        - 40-69: Warn (medium risk, manual review suggested)
        - 70+: Block (high risk)
        """
        if score >= 70:
            return (
                "block",
                "high",
                "Transaction blocked due to high fraud risk. Multiple red flags detected."
            )
        elif score >= 40:
            return (
                "warn",
                "medium",
                "Transaction flagged for manual review. Moderate risk indicators present."
            )
        else:
            return (
                "approve",
                "low",
                "Transaction approved. No significant risk indicators detected."
            )
    
    def get_flagged_accounts(self) -> set:
        """Return list of flagged accounts (for testing/debugging)"""
        return self.flagged_receivers
    
    def clear_history(self):
        """Clear transaction history (useful for testing)"""
        self.transaction_history.clear()
