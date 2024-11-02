"use client";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState } from "react";

export default function TestPage() {
  const [status, setStatus] = useState("");

  const testDb = async () => {
    try {
      console.log("Commencing");
      // Test write
      const docRef = await addDoc(collection(db, "test"), {
        hello: "world",
        timestamp: new Date(),
      });
      setStatus(`Written doc ${docRef.id}`);

      // Immediately read it back
      const snapshot = await getDocs(collection(db, "test"));
      console.log(
        "Documents: ",
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      );
    } catch (error) {
      if (error instanceof Error) {
        setStatus(`Error: ${error.message}`);
        console.error(error);
      }
    }
  };

  return (
    <div>
      <button onClick={testDb}>Test Database</button>
      <div>{status}</div>
    </div>
  );
}
