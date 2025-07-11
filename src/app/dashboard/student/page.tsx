import LetterForm from "app/components/LetterForm";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Student Dashboard</h1>

      <LetterForm />

    </div>
  );
}
