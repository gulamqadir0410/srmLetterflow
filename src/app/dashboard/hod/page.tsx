'use client';

import { useEffect, useState } from 'react';
import LogoutButton from '@/app/components/LogoutButton';

import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'firebase/config';

interface Letter {
  id: string;
  regId: string;
  firstName: string;
  lastName: string;
  subject: string;
  body: string;
  date: string;
  department: string;
  status: string;
}

export default function HodDashboard() {
  const hodDepartment = 'MCA'; // ✅ Replace with real dept later
  const [letters, setLetters] = useState<Letter[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'letters'),
      where('department', '==', hodDepartment),
      where('status', '==', 'hod_review')
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Letter[];
      setLetters(data);
    });

    return () => unsub();
  }, []);

  const handleAction = async (id: string, action: 'approve' | 'forward' | 'decline') => {
    const letterRef = doc(db, 'letters', id);

    const updateData =
      action === 'approve'
        ? {
            status: 'approved_by_hod',
            'signatures.hod': true,
          }
        : action === 'forward'
        ? {
            status: 'dean_review',
            'signatures.hod': true,
          }
        : {
            status: 'declined_by_hod',
          };

    await updateDoc(letterRef, updateData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-purple-700">🏛️ HOD Dashboard</h1>
        <LogoutButton />
      </div>

      {letters.length === 0 ? (
        <p>No letters to review for your department.</p>
      ) : (
        <div className="space-y-4">
          {letters.map((letter) => (
            <div key={letter.id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{letter.subject}</h2>
              <p className="text-sm text-gray-600">
                From: {letter.firstName} {letter.lastName} ({letter.regId})
              </p>
              <p className="mt-2 whitespace-pre-wrap">{letter.body}</p>
              <p className="text-sm text-gray-500 mt-1">Date: {letter.date}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleAction(letter.id, 'approve')}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => handleAction(letter.id, 'forward')}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  📤 Forward to Dean
                </button>
                <button
                  onClick={() => handleAction(letter.id, 'decline')}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  ❌ Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
