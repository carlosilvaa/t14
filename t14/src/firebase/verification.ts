// src/firebase/verification.ts
import { db } from "./config";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

export type EmailVerificationRecord = {
  email: string;
  code: string;
  createdAt: any;
  verified: boolean;
};

export async function saveVerificationCode(email: string, code: string) {
  const ref = doc(db, "emailVerifications", email);
  await setDoc(ref, {
    email,
    code,
    createdAt: serverTimestamp(),
    verified: false,
  });
}

export async function getVerificationRecord(
  email: string
): Promise<EmailVerificationRecord | null> {
  const ref = doc(db, "emailVerifications", email);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as EmailVerificationRecord;
}

export async function markVerificationUsed(email: string) {
  const ref = doc(db, "emailVerifications", email);
  await updateDoc(ref, { verified: true });
}
