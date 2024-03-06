import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    const navStyle = {
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const logoStyle = {
        fontSize: '24px',
    };

    const linkStyle = {
        textDecoration: 'none',
        color: '#fff',
        marginRight: '20px',
    };

    return (
        <nav style={navStyle}>
            <div style={logoStyle}>eWaste</div>
            <ul style={{listStyleType: 'none', margin: 0, padding: 0, display: 'flex'}}>
                <li><a href="#about" style={linkStyle}>About</a></li>
                <li><a href="#services" style={linkStyle}>Services</a></li>
                <li><a href="#contact" style={linkStyle}>Contact</a></li>
                <li><Link style={linkStyle} to="/login">Login</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
