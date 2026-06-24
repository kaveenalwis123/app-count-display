import time
import random
import firebase_admin
from firebase_admin import credentials, firestore

# Path to your Firebase service account JSON file
SERVICE_ACCOUNT_PATH = r"src\service_key.json"

# Initialize Firebase Admin SDK
cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
firebase_admin.initialize_app(cred)

# Firestore client
db = firestore.client()

# Reference to the SAME document (will be overwritten each time)
doc_ref = db.collection("load_cell_project").document("platform sensors")

print("Sending random binary arrays to Firestore every 2 seconds...")
print("Press Ctrl+C to stop.\n")

try:
    while True:
        arr = [random.randint(0, 1) for _ in range(3)]
        payload = {"platform conditions": arr}

        # set() overwrites the same document unless merge=True is used
        doc_ref.set(payload)

        print(f"Updated document with: {payload}")
        time.sleep(5)

except KeyboardInterrupt:
    print("\nStopped.")