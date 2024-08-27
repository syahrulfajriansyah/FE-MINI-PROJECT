"use client";

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import { withAuth } from '../utils/withAuth';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  registrations: number;
  revenue: number;
}

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Music Festival',
      date: '2024-09-10',
      location: 'Jakarta, Indonesia',
      registrations: 150,
      revenue: 45000000,
    },
    {
      id: 2,
      title: 'Tech Conference',
      date: '2024-10-15',
      location: 'Bandung, Indonesia',
      registrations: 200,
      revenue: 60000000,
    },
  ]);

  const totalRegistrations = events.reduce((acc, event) => acc + event.registrations, 0);
  const totalRevenue = events.reduce((acc, event) => acc + event.revenue, 0);

  const data = {
    labels: events.map(event => event.title),
    datasets: [
      {
        label: 'Registrations',
        data: events.map(event => event.registrations),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Revenue (IDR)',
        data: events.map(event => event.revenue),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-green-100 p-4 rounded-md">
              <p className="text-lg">Total Registrations</p>
              <p className="text-2xl font-bold">{totalRegistrations}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-md">
              <p className="text-lg">Total Revenue</p>
              <p className="text-2xl font-bold">IDR {totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Event Statistics</h2>
          <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Event Performance' } } }} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Events</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-100 border-b">Event</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Date</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Location</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Registrations</th>
                <th className="py-2 px-4 bg-gray-100 border-b">Revenue (IDR)</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td className="py-2 px-4 border-b">{event.title}</td>
                  <td className="py-2 px-4 border-b">{event.date}</td>
                  <td className="py-2 px-4 border-b">{event.location}</td>
                  <td className="py-2 px-4 border-b">{event.registrations}</td>
                  <td className="py-2 px-4 border-b">IDR {event.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
