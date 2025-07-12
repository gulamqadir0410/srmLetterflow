'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter, usePathname } from 'next/navigation';

// ✅ Use your own auth/db file, NOT Firebase SDK directly
import { auth, db } from '@/firebase/auth'; // or '../firebase/auth'

interface Props {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      const userRole = docSnap.exists() ? docSnap.data()?.role : null;

      if (!allowedRoles.includes(userRole)) {
        router.push('/unauthorized');
        return;
      }

      setChecking(false);
    });

    return () => unsub();
  }, [allowedRoles, pathname, router]);

  if (checking) return null;

  return <>{children}</>;
}
