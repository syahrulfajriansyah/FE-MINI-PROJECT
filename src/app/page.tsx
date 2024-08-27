// src/app/page.tsx
"use client"; // Mark this component as a Client Component

import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

// Define TypeScript interfaces for event data
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  price: string;
}

const Page: React.FC = () => {
  // State hooks
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 10; // Example total pages value

  // Fetch events or other data
  useEffect(() => {
    // Placeholder URL, replace with actual API endpoint
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/events?search=${searchQuery}&page=${currentPage}`);
        const data = await response.json();
        setEvents(data.events);
        // Assuming the response contains totalPages or similar
        // setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [searchQuery, currentPage]);

  // Handle search query changes
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Page;
