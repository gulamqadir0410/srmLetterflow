'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';

export default function LoginPage() {
  const router = useRouter();

  const [emailLogin, setEmailLogin] = useState({ email: '', password: '', error: '' });
  const [studentLogin, setStudentLogin] = useState({ regId: '', name: '' });
  const [showStudentForm, setShowStudentForm] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, emailLogin.email, emailLogin.password);
      if (emailLogin.email === 'mentor@gmail.com') {
        router.push('/dashboard/teacher');
      } else if (emailLogin.email === 'hod@gmail.com') {
        router.push('/dashboard/hod');
      } else if (emailLogin.email === 'dean@gmail.com') {
        router.push('/dashboard/dean');
      } else {
        setEmailLogin({ ...emailLogin, error: 'Unauthorized role' });
      }
    } catch (err: any) {
      setEmailLogin({ ...emailLogin, error: err.message });
    }
  };

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentLogin.regId && studentLogin.name) {
      router.push(`/dashboard/student?regId=${studentLogin.regId}&name=${encodeURIComponent(studentLogin.name)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {/* Show either faculty login or student form */}
      {!showStudentForm ? (
        <>
          <form
            onSubmit={handleEmailLogin}
            className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
          >
            <h2 className="text-xl font-bold text-center">Faculty Login</h2>

            <input
              type="email"
              placeholder="Email"
              value={emailLogin.email}
              onChange={(e) => setEmailLogin({ ...emailLogin, email: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={emailLogin.password}
              onChange={(e) => setEmailLogin({ ...emailLogin, password: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
            {emailLogin.error && <p className="text-red-500 text-sm">{emailLogin.error}</p>}

            <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              Login
            </button>

            <p className="text-sm text-center">
              Not a faculty?{' '}
              <button
                type="button"
                onClick={() => setShowStudentForm(true)}
                className="text-blue-600 underline hover:text-blue-800"
              >
                I'm a student →
              </button>
            </p>
          </form>
          <p className="text-sm text-center text-gray-700 mt-4">
            For Students Only{' '}
            <Link href="/status" className="text-blue-600 underline hover:text-blue-800">
              Check your letter status
            </Link>
          </p>
        </>
      ) : (
        <form
          onSubmit={handleStudentLogin}
          className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
        >
          <h2 className="text-xl font-bold text-center">Student Letter Submission</h2>

          <input
            type="text"
            placeholder="Registration ID"
            value={studentLogin.regId}
            onChange={(e) => setStudentLogin({ ...studentLogin, regId: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Full Name"
            value={studentLogin.name}
            onChange={(e) => setStudentLogin({ ...studentLogin, name: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Proceed to Form
          </button>

          <p className="text-sm text-center mt-2">
            <button
              type="button"
              onClick={() => setShowStudentForm(false)}
              className="text-blue-600 underline hover:text-blue-800"
            >
              ← Back to Faculty Login
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
