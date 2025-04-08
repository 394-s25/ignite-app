import React from 'react';

const NavBar = () => {
    return (
        <nav className="NavBar">
            <ul>
                <li><a href="/UserProfile">Edit</a></li>
                <li><a href="/StudentSwipePage">Swipe</a></li>
                <li>Liked you</li>
            </ul>
        </nav>
    )
}

export default NavBar;