import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import type { App } from "firebase-admin/app";
import type { Firestore } from "firebase-admin/firestore";

let app: App;
let db: Firestore;

// Firebase Admin SDKの初期化
export const initializeFirebaseAdmin = () => {
  if (getApps().length === 0) {
    // 環境変数からサービスアカウントキーを取得
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (!serviceAccountKey) {
      throw new Error(
        "Firebase service account key is not configured. " +
          "Please set FIREBASE_SERVICE_ACCOUNT_KEY in .env.local"
      );
    }

    const serviceAccount = JSON.parse(serviceAccountKey);

    app = initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id,
    });
  } else {
    app = getApps()[0];
  }

  db = getFirestore(app);
  return { app, db };
};

// Firestoreインスタンスを取得
export const getFirestoreAdmin = (): Firestore => {
  if (!db) {
    initializeFirebaseAdmin();
  }
  return db;
};
