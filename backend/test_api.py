"""
Test script for Fraud Detection API
Run this to verify backend is working correctly
"""

import requests
import json
from datetime import datetime

# API endpoint
API_URL = "http://localhost:8000"  # Change to your deployed URL for production testing

def print_result(name, response):
    """Pretty print test result"""
    print(f"\n{'='*60}")
    print(f"TEST: {name}")
    print(f"{'='*60}")
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Decision: {data['decision'].upper()}")
        print(f"Risk Score: {data['risk_score']}/100")
        print(f"Risk Level: {data['risk_level']}")
        print(f"Reason: {data['reason']}")
        print(f"Flags:")
        for flag in data['flags']:
            print(f"  • {flag}")
    else:
        print(f"Error: {response.text}")
    print(f"{'='*60}\n")

def test_health():
    """Test health endpoint"""
    print("\n🏥 Testing Health Endpoint...")
    response = requests.get(f"{API_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")

def test_low_risk():
    """Test low risk transaction - should APPROVE"""
    data = {
        "amount": 500.00,
        "sender_id": "user123",
        "receiver_id": "merchant456",
        "timestamp": datetime.now().isoformat()
    }
    response = requests.post(f"{API_URL}/api/evaluate-transaction", json=data)
    print_result("Low Risk Transaction (Should Approve)", response)

def test_medium_risk():
    """Test medium risk transaction - should WARN"""
    data = {
        "amount": 55000.00,
        "sender_id": "user789",
        "receiver_id": "vendor_xyz",
        "timestamp": datetime.now().isoformat()
    }
    response = requests.post(f"{API_URL}/api/evaluate-transaction", json=data)
    print_result("Medium Risk Transaction (Should Warn)", response)

def test_high_risk():
    """Test high risk transaction - should BLOCK"""
    data = {
        "amount": 75000.00,
        "sender_id": "account_001",
        "receiver_id": "flagged_account_1",
        "timestamp": datetime.now().isoformat()
    }
    response = requests.post(f"{API_URL}/api/evaluate-transaction", json=data)
    print_result("High Risk Transaction (Should Block)", response)

def test_velocity():
    """Test velocity check with rapid transactions"""
    print("\n⚡ Testing Velocity Check (Rapid Transactions)...\n")
    for i in range(4):
        data = {
            "amount": 1000.00,
            "sender_id": "rapid_user",
            "receiver_id": f"merchant_{i}",
            "timestamp": datetime.now().isoformat()
        }
        response = requests.post(f"{API_URL}/api/evaluate-transaction", json=data)
        print(f"Transaction {i+1}: {response.json()['decision']} (Score: {response.json()['risk_score']})")
    
    # The 4th transaction should have higher score due to velocity
    print("\n✅ Velocity check complete - later transactions should have higher scores")

def test_flagged_accounts():
    """Test get flagged accounts endpoint"""
    print("\n🚩 Testing Flagged Accounts Endpoint...")
    response = requests.get(f"{API_URL}/api/flagged-accounts")
    print(f"Status: {response.status_code}")
    print(f"Flagged Accounts: {response.json()['flagged_accounts']}")

def test_invalid_data():
    """Test with invalid data - should return 400"""
    data = {
        "amount": -100.00,  # Negative amount (invalid)
        "sender_id": "",     # Empty sender (invalid)
        "receiver_id": "test",
        "timestamp": datetime.now().isoformat()
    }
    response = requests.post(f"{API_URL}/api/evaluate-transaction", json=data)
    print_result("Invalid Data Test (Should Fail Validation)", response)

def main():
    print("""
    ╔══════════════════════════════════════════════════════════╗
    ║         FRAUD DETECTION API - TEST SUITE                ║
    ║              VexStorm'26 - Capital-Core                 ║
    ╚══════════════════════════════════════════════════════════╝
    """)
    
    print(f"Testing API at: {API_URL}")
    print("Make sure the backend is running!")
    
    try:
        # Run all tests
        test_health()
        test_low_risk()
        test_medium_risk()
        test_high_risk()
        test_velocity()
        test_flagged_accounts()
        test_invalid_data()
        
        print("\n" + "="*60)
        print("✅ ALL TESTS COMPLETED")
        print("="*60)
        print("\nCheck results above to verify expected behavior:")
        print("  • Low Risk → APPROVE (score 0-39)")
        print("  • Medium Risk → WARN (score 40-69)")
        print("  • High Risk → BLOCK (score 70+)")
        print("  • Velocity → Increasing scores for rapid transactions")
        print("="*60 + "\n")
        
    except requests.exceptions.ConnectionError:
        print("\n❌ ERROR: Could not connect to API")
        print(f"Make sure the backend is running at {API_URL}")
        print("\nTo start backend:")
        print("  cd backend")
        print("  uvicorn app.main:app --reload")
        
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")

if __name__ == "__main__":
    main()
