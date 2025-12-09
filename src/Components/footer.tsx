import React from "react";

export default function Footer() {
  return (
    <footer className="w-screen bg-linear-to-r from-violet-900 via-blue-950 to-green-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo / About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">YourLogo</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Short description about your company or brand.  
            Replace this placeholder text with your own content.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">About</a></li>
            <li><a href="#" className="hover:text-white transition">Services</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: <span className="text-gray-400">your@email.com</span></li>
            <li>Phone: <span className="text-gray-400">+1 (000) 000-0000</span></li>
            <li>Address: <span className="text-gray-400">Your Address Here</span></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Newsletter</h3>
          <p className="text-gray-400 text-sm mb-3">
            Subscribe to get updates and news.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none"
            />
            <button className="px-4 py-2 bg-violet-700 hover:bg-violet-600 text-white rounded-r-lg transition">
              Go
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </footer>
  );
}