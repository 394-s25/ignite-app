import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    const handleLogout = async() => {
        const auth = getAuth();
        try {
            await signOut(auth)
            localStorage.removeItem('user')
            sessionStorage.clear()
            navigate('/')
        }
        catch (error) {
            console.error("Error signing out: ", error);
        }

    }

    return (
        <nav class="bg-purple-100 border-gray-200">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="public/ignite.svg" class="h-14" alt="Ignite Logo" />
            </a>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0"> 
                <li>
                <a href="/studentswipe" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-800 md:p-0 md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Swipe</a>
                </li>
                <li>
                <a href="/studentlikes" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-800 md:p-0 md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Companies that Liked Me</a>
                </li>
                <li>
                <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-800 md:p-0 md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">My Company List</a>
                </li>
                <li>
                <a href="/editProfile" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-800 md:p-0 md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">My Profile</a>
                </li>
                <li>
                <button onClick={handleLogout}>
                    <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-800 md:p-0 md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</a>
                </button>
                </li>
            </ul>
            </div>
        </div>
        </nav>

    )
}

export default NavBar;