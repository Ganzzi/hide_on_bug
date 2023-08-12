import { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { AddWatchListModal, Header } from "../components";

import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../utils/axios";

import { formatDateTime } from "../utils";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function Homescreen ()
{
    const { user, token, setUser, setToken, alerts, setAlerts } =
        useStateContext();
    const [userDataFetched, setUserDataFetched] = useState(false);
    const [searchRequest, setSearchRequest] = useState("");
    const [showSearchResponse, setShowSearchResponse] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [watchlists, setWatchlists] = useState([]);
    const [userProvider, setUserProvider] = useState([]);
    const [showAddWatchListModal, setShowAddWatchListModal] = useState(false);

    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(true);

    const handleAddWatchList = async () =>
    {
        setShowAddWatchListModal(true);
    };

    const handleAddWatchListSuccess = async () =>
    {
        await getWatlistVideo();
    };
    const getWatlistVideo = async () =>
    {
        await axiosClient.get("watchlists").then(({ data }) =>
        {
            console.log(data);
            setWatchlists(data);
        });
    };
    useEffect(() =>
    {
        const getSubcribed = async () =>
        {
            await axiosClient.get("getProviders").then(({ data }) =>
            {
                console.log(data);
                setUserProvider(data.providers);
            });
        };

        getSubcribed();
        getWatlistVideo();
    }, []);

    // useEffect to show alert in home page
    useEffect(() =>
    {
        setShowAlert(true);
        const timer = setTimeout(() =>
        {
            setShowAlert(false);
            setAlerts({
                type: null,
                message: null,
                time: null,
            });
        }, 5000);

        return () =>
        {
            clearTimeout(timer);
        };
    }, [alerts]);

    // useEffect to get data base on token
    useEffect(() =>
    {
        if (token)
        {
            axiosClient
                .get("/user")
                .then(({ data }) =>
                {
                    setUser(data);
                    setUserDataFetched(true);
                })
                .catch((err) =>
                {
                    const response = err.response;

                    if (response && response.status === 401)
                    {
                        console.error(response.status); // Access the status code
                        console.error(response.data.message);
                        localStorage.removeItem("ACCESS_TOKEN");
                    }
                });
        }
    }, [token, setUser]);

    // function to get user result when search
    const handleSearchUsers = async (e) =>
    {
        e.preventDefault();
    };

    // protected navigation
    if (!token)
    {
        return <Navigate to={"/"} />;
    } else if (token && user.role_id == 1 && userDataFetched)
    {
        return <Navigate to={"/admin"} />;
    }

    return (
        <div id="homeLayout" className="">
            {/* Home Page Header */}
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="sideBar-Home col-3 d-flex flex-column">
                        {/* sideBar-Home  */}

                        <Menu className="Menu">
                            <hr />
                            <MenuItem
                                onClick={() =>
                                {
                                    navigate("home");
                                }}
                            >
                                <i className="m-2">
                                    <FontAwesomeIcon icon={faHome} />
                                </i>
                            </MenuItem>
                            <SubMenu label="Watch List">
                                {showAddWatchListModal ? (
                                    <AddWatchListModal
                                        onSuccess={handleAddWatchListSuccess}
                                        onClose={() =>
                                            setShowAddWatchListModal(false)
                                        }
                                    />
                                ) : (
                                    <MenuItem
                                        onClick={() => handleAddWatchList()}
                                    >
                                        Add new watch list
                                    </MenuItem>
                                )}
                                {watchlists.map((item, index) => (
                                    <MenuItem
                                        onClick={() =>
                                        {
                                            navigate(`watchList/${item.id}`);
                                        }}
                                    >
                                        {item.watch_list_name}
                                    </MenuItem>
                                ))}
                            </SubMenu>
                            <MenuItem
                                onClick={() =>
                                {
                                    navigate("history");
                                }}
                            >
                                <i className="m-1">
                                    <FontAwesomeIcon icon={faArrowRotateLeft} />
                                </i>{" "}
                                History{" "}
                            </MenuItem>
                            <SubMenu label="Subcribed">
                                {userProvider.map((item, index) => (
                                    <MenuItem
                                        onClick={() =>
                                        {
                                            navigate(`subcribed/${item.id}`);
                                        }}
                                    >
                                        <div className="d-flex flex-row">
                                            <img
                                                src={
                                                    `http://127.0.0.1:8001/api/images/` +
                                                    item.provider_logo
                                                }
                                                style={{
                                                    width: 30,
                                                    height: 30,
                                                    borderRadius: 30,
                                                }}
                                                alt=""
                                            />
                                            {item?.provider_name}
                                        </div>
                                    </MenuItem>
                                ))}
                            </SubMenu>
                            <MenuItem
                                onClick={() =>
                                {
                                    navigate("profile");
                                }}
                            >
                                {" "}
                                <i className="m-1">
                                    <FontAwesomeIcon icon={faUserPlus} />
                                </i>{" "}
                                Profile{" "}
                            </MenuItem>
                            <hr />
                            <h5 className="text-center"> Privacy & Contact </h5>
                            <div className="d-flex flex-column bd-highlight mb-3">
                                <a href="" className="text-decoration-none">
                                    {" "}
                                    <div
                                        className="p-2 bd-highlight"
                                        onClick={() =>
                                        {
                                            navigate("contact");
                                        }}
                                    >
                                        Contact Us
                                    </div>{" "}
                                </a>
                                <div className="p-2 bd-highlight">
                                    HotLine: +0123256789
                                </div>
                                <div className="p-2 bd-highlight">
                                    Address: 590 CMT8 District 3
                                </div>
                                <div className="mt-3">
                                    <p>
                                        {" "}
                                        © 2023 StreamTrace, Inc. All Rights
                                        Reserved
                                    </p>
                                </div>
                            </div>
                        </Menu>
                    </div>
                    {/* Main content */}{" "}
                    {user.role_id != 1 && (
                        <div className="col-9">
                            <Outlet />
                        </div>
                    )}
                </div>
            </div>
            {/* Alert */}
            {showAlert && alerts.type && (
                <div
                    className="alert-home"
                    style={{
                        backgroundColor: `${alerts.type == "info"
                            ? "#00ccff"
                            : alerts.type == "warming"
                                ? "#FFCC99"
                                : alerts.type == "error" && "#CC0000"
                            }`,
                    }}
                >
                    <div className="alert-content">
                        <p>{alerts.message}</p>
                        <p className="alert-time">
                            {formatDateTime(alerts.time)}
                        </p>
                    </div>
                    <button
                        className="alert-close-btn"
                        onClick={() =>
                        {
                            setShowAlert(false);
                        }}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}
