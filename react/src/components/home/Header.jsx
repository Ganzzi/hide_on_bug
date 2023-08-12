import React, { useEffect, useState } from "react";
import { logo } from "../../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreen } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axios";
import { useStateContext } from "../../contexts/ContextProvider";

const Header = () =>
{
    const { user, token, setUser, setToken, alerts, setAlerts } =
        useStateContext();
    const [searchRequest, setSearchRequest] = useState("");
    const [searchResponse, setSearchResponse] = useState([]);

    const navigate = useNavigate();
    // function to logout
    const onLogout = async (ev) =>
    {
        ev.preventDefault();

        await axiosClient
            .post("/logout")
            .then(() =>
            {
                setToken(null);
                setUser({});
            })
            .catch((err) =>
            {
                console.log(err);
                setToken(null);
                setUser({});
            });
    };

    useEffect(() =>
    {
        const getSearch = async () =>
        {
            await axiosClient
                .post("search_film", {
                    film_name: searchRequest,
                })
                .then(({ data }) =>
                {
                    setSearchResponse(data.films);
                });
        };

        if (searchRequest != "")
        {
            getSearch();
        } else
        {
            setSearchResponse(null);
        }
    }, [searchRequest]);

    const handleSearch = (value) =>
    {
        setSearchRequest(value);
    };

    return (
        <header className="header col-12 bg-black d-flex justify-content-between">
            {/* Logo */}
            <div
                className="d-flex flex-row  "
                onClick={() =>
                {
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

            <div
                className="search-bar"
                style={{
                    position: "relative",
                }}
            >
                {/* Search Bar */}
                <input
                    type="text"
                    className="search-bar-input"
                    placeholder="Search"
                    onChange={(e) => handleSearch(e.target.value)}
                ></input>

                <div
                    style={{
                        position: "absolute",
                        backgroundColor: "black",
                        zIndex: 99,
                    }}
                >
                    {searchResponse &&
                        searchResponse.map((v, k) => (
                            <div key={k} className="d-flex flex-row">
                                <img
                                    src={
                                        `http://127.0.0.1:8001/api/images/` +
                                        v.film_poster
                                    }
                                    style={{
                                        width: 80,
                                        height: 80,
                                    }}
                                    alt=""
                                />
                                <h1>{v.film_name}</h1>
                            </div>
                        ))}
                </div>
            </div>
            {/* User Profile */}
            <div className="user-profile">
                {/* <p className="m-3 mb-0">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Sign In
                </p>
                <p className="m-3 mb-0">
                    <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />
                    Sign Up
                </p> */}
                <p className="m-3 mb-0" onClick={onLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                </p>
            </div>
        </header>
    );
};

export default Header;
