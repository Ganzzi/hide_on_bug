import React from "react";
import { logo } from "../../assets";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMobileScreen } from '@fortawesome/free-solid-svg-icons';
import {faPhone } from '@fortawesome/free-solid-svg-icons';
import {faUser } from '@fortawesome/free-solid-svg-icons';
import {faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="header col-12 bg-black d-flex justify-content-between">
            {/* Logo */}
            <div
                className="ml-10"
                onClick={() => {
                    navigate("home");
                }}
            >
                 <img src={logo} alt="" width={150} height={100} />
        <p className="m-3 mb-0"><FontAwesomeIcon icon={faMobileScreen} className="mr-2"/>+012321888</p>
        <p className="m-3 mb-0"><FontAwesomeIcon icon={faPhone} className="mr-2"/>+1113</p>
      </div>

            {/* Search Bar */}
            <input type="text" className="search-bar" placeholder="Search" />

            {/* User Profile */}
            <div className="user-profile">
            <p className="m-3 mb-0"><FontAwesomeIcon icon={faUser} className="mr-2"/>Sign In</p>
        <p className="m-3 mb-0"><FontAwesomeIcon icon={faRightToBracket} className="mr-2"/>Sign Up</p>
            </div>
        </header>
    );
};

export default Header;
