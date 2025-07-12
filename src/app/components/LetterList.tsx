'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';

interface Letter {
  id: string;
  subject: string;
  date: string;
  status: string;
}

export default function LetterList({ studentRegId }: { studentRegId: string }) {
  const [letters, setLetters] = useState<Letter[]>([]);

  useEffect(() => {
    if (!studentRegId) return;

    const q = query(collection(db, 'letters'), where('regId', '==', studentRegId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Letter[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        subject: doc.data().subject,
        date: doc.data().date,
        status: doc.data().status,
      }));
      setLetters(data);
    });

    return () => unsubscribe();
  }, [studentRegId]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this letter?')) {
      await deleteDoc(doc(db, 'letters', id));
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Your Submitted Letters</h2>
      {letters.length === 0 ? (
        <p className="text-gray-500">No letters submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {letters.map((letter) => (
            <div
              key={letter.id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium">📄 {letter.subject}</p>
                <p className="text-sm text-gray-500">🗓️ {letter.date}</p>
                <p className="text-sm">
                  Status:{' '}
                  <span
                    className={
                      letter.status === 'pending'
                        ? 'text-yellow-600'
                        : letter.status === 'declined'
                        ? 'text-red-600'
                        : 'text-green-600'
                    }
                  >
                    {letter.status}
                  </span>
                </p>
              </div>

              {letter.status === 'pending' && (
                <button
                  onClick={() => handleDelete(letter.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
