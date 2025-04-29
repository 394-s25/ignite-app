import React from "react";
import { useAuth } from "../contexts/authContext";
import { useProfile } from "../contexts/profileContext";
import { useNavigate, Link } from "react-router-dom";

const NavBar = () => {
  const { logout, authUser } = useAuth();
  const navigate = useNavigate();
  const { profileType } = useProfile();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("logout failed:", error);
    }
  };

  return (
    <nav className="bg-purple-100 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/ignite-01.png" className="h-13" alt="Ignite Logo" />
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <Link
                to="/swipe"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-800 md:p-0 md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Swipe
              </Link>
            </li>
            <li>
            <Link
                to={profileType === "company" ? "/companylikes" : "/studentlikes"}
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-800 md:p-0 md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                {profileType === "company"
                  ? "Students that Liked Me"
                  : "Companies that Liked Me"}
              </Link>
            </li>
            <li>
              <Link
                to="/companylist"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-800 md:p-0 md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                My Company List
              </Link>
            </li>
            <li>
              <Link
                to="/editProfile"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-800 md:p-0 md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                My Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-800 md:p-0 md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
