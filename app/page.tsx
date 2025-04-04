"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
        Welcome to <span className="text-blue-600">Hospital Finder</span> 🏥
      </h1>
      <p className="text-lg text-gray-700 text-center max-w-md mb-6">
        Easily locate nearby hospitals and get directions with just one click!
      </p>

      <Link
        href="/hospitals"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-200"
        aria-label="Find Nearby Hospitals"
      >
        🔍 Search Nearby Hospitals
      </Link>
    </div>
  );
}
