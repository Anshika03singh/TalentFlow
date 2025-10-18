import React, { useState } from "react";
import { Button } from "../ui/Button";
import { NAV_LINKS } from "../../utils/constants";
import { useNavigate, Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ✅ Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo.jpg" // ✅ from public folder
              alt="TalentFlow Logo"
              className="w-9 h-9 object-contain"
            />
            <span className="text-xl font-bold">TalentFlow</span>
          </Link>

          {/* ✅ Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-white/90 hover:text-pink-200 font-medium transition-all duration-200 hover:underline hover:underline-offset-8"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* ✅ HR Login Button */}
          <div className="hidden md:block">
            <Button
              variant="default"
              size="lg"
              className="text-purple-700 bg-white hover:bg-pink-100 font-semibold transition-all"
              onClick={() => navigate("/hr-login")}
            >
              Login
            </Button>
          </div>

          {/* ✅ Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-white hover:text-pink-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink-300"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* ✅ Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 bg-gradient-to-b from-purple-700 via-indigo-700 to-pink-600">
            <div className="flex flex-col space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-white/90 hover:text-pink-200 font-medium transition-colors duration-200 px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-2 pt-2">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full bg-white text-purple-700 hover:bg-pink-100 font-semibold transition-all"
                  onClick={() => {
                    navigate("/hr-login");
                    setIsMenuOpen(false);
                  }}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
