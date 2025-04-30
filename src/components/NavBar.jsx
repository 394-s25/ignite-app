import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useProfile } from "../contexts/profileContext";
import { useNavigate, Link } from "react-router-dom";

const NavBar = () => {
  const { logout, authUser } = useAuth();
  const navigate = useNavigate();
  const { profileType } = useProfile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("logout failed:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-violet-50 border border-violet-100">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/ignite-01.png" className="h-8" alt="Ignite Logo" />
        </Link>

        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-900 rounded-lg md:hidden hover:bg-violet-100"
          onClick={toggleMobileMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <div className="flex flex-col p-4 md:p-0 mt-4 md:mt-0 md:flex-row md:space-x-6 rtl:space-x-reverse">
            <Link
              to="/swipe"
              className="font-semibold text-gray-900 py-2 px-3 rounded hover:text-violet-700 hover:bg-violet-100 md:hover:bg-transparent"
            >
              Swipe
            </Link>
            <Link
              to={profileType === "company" ? "/companylikes" : "/studentlikes"}
              className="font-semibold text-gray-900 py-2 px-3 rounded hover:text-violet-700 hover:bg-violet-100 md:hover:bg-transparent"
            >
              {profileType === "company"
                ? "Students that Liked Me"
                : "Companies that Liked Me"}
            </Link>
            <Link
              to={
                profileType === "company"
                  ? "/companyMatches"
                  : "/studentMatches"
              }
              className="font-semibold text-gray-900 py-2 px-3 rounded hover:text-violet-700 hover:bg-violet-100 md:hover:bg-transparent"
            >
              {profileType === "company"
                ? "My Students Matches"
                : "My Companies Matches"}
            </Link>
            <Link
              to="/editProfile"
              className="font-semibold text-gray-900 py-2 px-3 rounded hover:text-violet-700 hover:bg-violet-100 md:hover:bg-transparent"
            >
              My Profile
            </Link>
            <button
              onClick={handleLogout}
              className="font-semibold text-gray-900 py-2 px-3 text-left rounded hover:text-violet-700 hover:bg-violet-100 md:hover:bg-transparent"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
