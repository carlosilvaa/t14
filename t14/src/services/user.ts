import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { AppUser } from "@/types/User";

export type UserDoc = {
  id: string;
  email: string;
  name?: string | null;
  password?: string;     
  notification: boolean;
  isActive: boolean;
};

export type User = UserDoc;

export async function createUserInFirestore(user: AppUser) {
  const ref = doc(db, "users", user.uid);

  await setDoc(
    ref,
    {
      id: user.uid,
      email: user.email,
      name: user.name ?? null,
      notification: user.notification ?? true,
      isActive: user.isActive ?? true,
    },
    { merge: true }
  );
}

export async function getUserFromFirestore(
  userId: string
): Promise<UserDoc | null> {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const data = snap.data() as any;

  return {
    id: userId,
    email: data.email ?? "",
    name: data.name ?? null,
    password: data.password ?? undefined,
    notification:
      typeof data.notification === "boolean" ? data.notification : true,
    isActive: typeof data.isActive === "boolean" ? data.isActive : true,
  };
}

export async function updateUserInFirestore(
  userId: string,
  data: Partial<UserDoc>
) {
  const ref = doc(db, "users", userId);
  await updateDoc(ref, data);
}

export async function getAllUsers(): Promise<UserDoc[]> {
  const colRef = collection(db, "users");
  const snapshot = await getDocs(colRef);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data() as any;
    return {
      id: docSnap.id,
      email: data.email ?? "",
      name: data.name ?? null,
      password: data.password ?? undefined,
      notification:
        typeof data.notification === "boolean" ? data.notification : true,
      isActive: typeof data.isActive === "boolean" ? data.isActive : true,
    };
  });
}
