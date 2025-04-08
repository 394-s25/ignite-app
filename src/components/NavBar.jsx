import React from 'react';
import './NavBar.css';
import { Pen, Heart, Check } from "lucide-react";

const NavBar = () => {
    return (
        <nav className="NavBar">
            <ul>
                <li><a href="/editProfile"><Pen className="w-8 h-8"/></a></li>
                <li><a href="/studentswipe"><Check className="w-8 h-8"/></a></li>
                <li><a href="/studentlikes"><Heart className="w-8 h-8" /></a></li>
            </ul>
        </nav>
    )
}

export default NavBar;