import React from "react";

export default function Header() {
  return (
    <header className="w-screen bg-linear-to-r from-violet-600 via-blue-700 to-green-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left: Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="text-3xl font-extrabold text-white tracking-wide drop-shadow-md"
            >
              ArabIQ
            </a>
          </div>

          {/* Middle: Navigation */}
          <nav className="hidden sm:flex space-x-10">
            <a
              href="/"
              className="text-base font-medium text-white/90 hover:text-white transition duration-200"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-base font-medium text-white/90 hover:text-white transition duration-200"
            >
              About
            </a>
            <a
              href="/services"
              className="text-base font-medium text-white/90 hover:text-white transition duration-200"
            >
              Services
            </a>
          </nav>

          {/* Right: Phone */}
          <div className="flex items-center space-x-4">
            <span className="text-base font-semibold text-white drop-shadow-sm">
              +1 (555) 123-4567
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}