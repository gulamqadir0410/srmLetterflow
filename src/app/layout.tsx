import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LetterFlow',
  description: 'Student Letter Submission App',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white px-4 py-2 shadow">
          <span className="text-xl font-bold text-blue-600">LetterFlow</span>
        </nav>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
