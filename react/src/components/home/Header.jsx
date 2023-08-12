import React, { useState } from "react";
import { logo } from "../../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreen } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../utils/axios";

const Header = () => {
 

    const navigate = useNavigate();

    const { user, token, setUser, setToken, alerts, setAlerts } =
        useStateContext();

    // function to logout
    const onLogout = async (ev) => {
        ev.preventDefault();

        await axiosClient
            .post("/logout")
            .then(() => {
                setToken(null);
                setUser({});
            })
            .catch((err) => {
                console.log(err);
                setToken(null);
                setUser({});
            });
    };
    return (
        <header className="header col-12 bg-black d-flex justify-content-between">
            {/* Logo */}
            <div
                className="d-flex flex-row  "
                onClick={() => {
                    navigate("home");
                }}
            >
                <img src={logo} alt="" width={150} height={100} />
                <p className="m-3 mb-0 mt-5">
                    <FontAwesomeIcon icon={faMobileScreen} className="mr-2" />
                    +012321888
                </p>
                <p className="m-3 mb-0 mt-5">
                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                    +1113
                </p>
            </div>

            {/* Search Bar */}
            <input type="text" className="search-bar" placeholder="Search" />

            {/* User Profile */}
            <div className="user-profile">
                <p className="m-3 mb-0">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Sign In
                </p>
                <p className="m-3 mb-0">
                    <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />
                    Sign Up
                </p>
                <p className="m-3 mb-0" onClick={onLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                </p>
            </div>
        </header>
    );
};

export default Header;
