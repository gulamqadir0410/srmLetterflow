"use client";
import { useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function StatusPage() {
  const [regId, setRegId] = useState("");
  const [name, setName] = useState("");
  const [letters, setLetters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    if (!regId) return;
    setLoading(true);
    setLetters([]);

    try {
      const q = query(
        collection(db, "letters"),
        where("regId", "==", regId),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      const matchedLetters = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLetters(matchedLetters);
    } catch (err) {
      console.error("Error fetching letter status:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "mentor_review":
        return "Pending Mentor Approval";
      case "hod_review":
        return "Forwarded to HOD";
      case "dean_review":
        return "Forwarded to Dean";
      case "approved":
        return "Approved by Dean";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  const getSignatures = (signatures: any) => {
    const approvers = [];
    if (signatures?.mentor) approvers.push("Mentor");
    if (signatures?.hod) approvers.push("HOD");
    if (signatures?.dean) approvers.push("Dean");
    return approvers.length ? approvers.join(", ") : "Not yet approved";
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Check Letter Status</h1>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Enter Registration ID"
          value={regId}
          onChange={(e) => setRegId(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="(Optional) Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={fetchStatus}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Check Status
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {letters.length === 0 && !loading && (
        <p className="text-gray-500">No letters found for this ID.</p>
      )}

      {letters.map((letter) => (
        <div
          key={letter.id}
          className="bg-white border p-4 mb-4 rounded shadow"
        >
          <p>
            <strong>Subject:</strong> {letter.subject}
          </p>
          <p>
            <strong>Date:</strong> {letter.date}
          </p>
          <p>
            <strong>Status:</strong> {getStatusText(letter.status)}
          </p>
          <p>
            <strong>Approved By:</strong> {getSignatures(letter.signatures)}
          </p>
          <p>
            <strong>Body:</strong> {letter.body}
          </p>
        </div>
      ))}
    </div>
  );
}
