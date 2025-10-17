import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-yellow-300 to-yellow-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex flex-col">
                <div className="flex space-x-1">
                  <div className="w-8 h-1.5 bg-blue-600 rounded"></div>
                  <div className="w-8 h-1.5 bg-red-600 rounded"></div>
                </div>
                <div className="flex space-x-1 mt-1">
                  <div className="w-8 h-1.5 bg-white rounded"></div>
                  <div className="w-8 h-1.5 bg-green-600 rounded"></div>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900">BookBlaze</span>
            </div>
            <p className="text-gray-800 text-sm mb-4">
              A space to offer industry focused IT resources to help clients and professionals acquire necessary knowhow on digital transformation using our technical expertise.
            </p>
            <div className="flex items-center space-x-2 text-gray-800">
              <Mail className="h-4 w-4" />
              <span className="text-sm">contact@bookblaze.org</span>
            </div>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="bg-white p-2 rounded hover:bg-gray-100 transition-colors">
                <Instagram className="h-5 w-5 text-gray-800" />
              </a>
              <a href="#" className="bg-white p-2 rounded hover:bg-gray-100 transition-colors">
                <Facebook className="h-5 w-5 text-gray-800" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-800 hover:text-gray-900 text-sm transition-colors">
                  Software System Design
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-800 hover:text-gray-900 text-sm transition-colors">
                  Software Architecture Patterns
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-800 hover:text-gray-900 text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-800 hover:text-gray-900 text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-800 hover:text-gray-900 text-sm transition-colors">
                  Product
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-800 hover:text-gray-900 text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Policies */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-800 hover:text-gray-900 text-sm transition-colors">
                  Pricing Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-800 hover:text-gray-900 text-sm transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-800 hover:text-gray-900 text-sm transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-800 hover:text-gray-900 text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-800 hover:text-gray-900 text-sm transition-colors">
                  Cancellation/Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-yellow-500 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-800">
          <p>© 2025, BookBlaze Digital Works. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Design & Developed by <span className="font-semibold">BookBlaze Team</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
