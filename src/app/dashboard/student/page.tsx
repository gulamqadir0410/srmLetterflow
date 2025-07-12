'use client';

import LetterForm from "app/components/LetterForm";
import LetterList from "app/components/LetterList";



export default function StudentDashboardPage() {
  const studentRegId = '21BCA1234'; // 🔐 Later use Firebase Auth to get real ID

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">📋 Student Dashboard</h1>
      
      {/* Letter Submission Form */}
      <LetterForm />

      {/* List of Submitted Letters */}
      <LetterList studentRegId={studentRegId} />
    </div>
  );
}
