'use client';
import { useState } from 'react';

export default function LetterForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    regId: '',
    department: '',
    stream: '',
    mentor: '',
    subject: '',
    body: '',
    date: '',
  });

  // Mapping: department -> mentors
  const departmentMentors: Record<string, string[]> = {
    CSE: ['Mr. Sharma', 'Ms. Patel'],
    IT: ['Mr. Verma', 'Mrs. Roy'],
    ECE: ['Dr. Sinha', 'Ms. Mehta'],
    ME: ['Mr. Reddy', 'Dr. Das'],
    BCA: ['Mrs. Khan', 'Mr. Alam'],
    MCA: ['Dr. Ahuja', 'Mr. Iyer'],
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Reset mentor if department changes
    if (name === 'department') {
      setForm((prev) => ({
        ...prev,
        department: value,
        mentor: '',
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Letter Form Data:', form);
    // You can replace this with Firestore submission later

    // Reset form
    setForm({
      firstName: '',
      lastName: '',
      regId: '',
      department: '',
      stream: '',
      mentor: '',
      subject: '',
      body: '',
      date: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-sm">First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-sm">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-sm">Registration ID</label>
          <input
            type="text"
            name="regId"
            value={form.regId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-sm">Department</label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Department</option>
            {Object.keys(departmentMentors).map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-sm">Stream</label>
          <input
            type="text"
            name="stream"
            value={form.stream}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-sm">Class Mentor</label>
          <select
            name="mentor"
            value={form.mentor}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
            disabled={!form.department}
          >
            <option value="">
              {form.department ? 'Select Mentor' : 'Select Department First'}
            </option>
            {form.department &&
              departmentMentors[form.department].map((mentor) => (
                <option key={mentor} value={mentor}>
                  {mentor}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block font-medium text-sm">Subject</label>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-sm">Body of Document</label>
        <textarea
          name="body"
          value={form.body}
          onChange={handleChange}
          rows={5}
          className="w-full border p-2 rounded resize-none"
          placeholder="Enter your letter content..."
          required
        />
      </div>

      <div>
        <label className="block font-medium text-sm">Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Letter
      </button>
    </form>
  );
}
