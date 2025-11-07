import React from "react";
import "./Navbar.css";
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <>
            <div className="navbar">
                <Link to="/"><p>BERANDA</p></Link>
                <Link to="/about"><p>TENTANG KAMI</p></Link>
            </div>
        </>
    )
}

export default Navbar;