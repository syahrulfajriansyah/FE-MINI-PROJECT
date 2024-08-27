// src/app/createEvent/page.tsx

"use client";

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/navigation'; // Update next/router to next/navigation
import Login from '../login';
// import { withAuth } from '../utils/withAuth';

const CreateEvent: React.FC = () => {
  const [eventName, setEventName] = useState('');
  const router = useRouter();

  // Komponen lainnya
  return (
    <div>
      <Navbar />
      <Login />
      {/* Konten lainnya */}
    </div>
  );
};

export default CreateEvent;
