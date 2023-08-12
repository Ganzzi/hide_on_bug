import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../utils/axios";
import { BiUser, BiLogOut, BiUserCheck } from "react-icons/Bi";
import { BsFillChatDotsFill, BsFillFilePostFill } from "react-icons/Bs";

export default function dashboard() {
    const { user, token, setUser, setToken, alerts, showAlert } =
        useStateContext();
    const [userDataFetched, setUserDataFetched] = useState(false);

    // useEffect to get data base on token
    useEffect(() => {
        if (token) {
            axiosClient.get("/user").then(({ data }) => {
                setUser(data);
                setUserDataFetched(true);
            });
        }
    }, [token]);

    // protected navigation
    if (!token) {
        return <Navigate to={"/"} />;
    } else if (token && user.role_id != 1 && userDataFetched) {
        return <Navigate to={"/posts"} />;
    }

    // function to logout
    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setToken(null);
            setUser({});
        });
    };

    return (
        <div id="dashboardLayout">
            {/* Aside place */}
            <aside className="border">
                {/* admin name, image */}
                <div  
                    style={{
                        fontFamily: "serif",
                        fontSize: "30px",
                        paddingLeft: "0px",
                        color:"black",
                    }}
                >
                    {user?.image && (
                        <img className="m-5"
                            src={
                                `${import.meta.env.VITE_BASE_URL}/api/images/kfc.png` 
                               
                            }
                            alt=""
                            style={{ width: "80px", height: "80px", borderRadius:"100px" }}
                        />
                    )}
                  <i className="m-5">Admin</i> 
                </div>
                   <hr  style={{
                        
                        color:"black",
                    }}/>
                <div className="d-flex flex-column">
                    <Link to={"/admin/users"}> <h5>  <FontAwesomeIcon icon={faUser} className="mr-2" /> User</h5> </Link>
                    <hr  style={{
                        
                        color:"black",
                    }}/>
                    <Link to={"/admin/providers"}><h5>List Provider</h5></Link>
                </div>
            </aside>

            {/* Information place */}
            <div className="container">
                {/* header */}
                <div id="head">
                    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom ">
                        <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                            <svg className="bi me-2" width="80" height="32">
                                <use xlinkHref="#bootstrap" />
                            </svg>
                            
                          <i>  <span
                                className="fs-2"
                                style={{
                                    fontFamily: "serif",

                                    fontWeight: "bold",

                                    paddingBottom: "10rem",
                                }}
                            >
                                StreamTrace - Admin
                            </span></i> 
                        </a>
                        <ul className="nav nav-pills">
                            <h4 className="m-3" style={{
                                      fontFamily:"serif"
                                    }}>Logout</h4>
                            <li className="nav-item">
                                
                                <a
                                    href="#"
                                    className="nav-link active"
                                    aria-current="page"
                                    style={{
                                        backgroundColor:"black",
                                        border: "solid thin black",
                                        borderRadius: "30px",
                                        padding: 10,
                                    }}
                                    onClick={onLogout}
                                >
                                    <BiLogOut size={40} />
                                </a>
                            </li>
                        </ul>
                    </header>
                </div>

                {/* main content */}
                <main id="father">{user.role_id == 1 && <Outlet />}</main>

                {/* Alert */}
                {showAlert && alerts.type && (
                    <div
                        className="alert-admin"
                        style={{
                            backgroundColor: `${
                                alerts.type == "info"
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
                            onClick={handleAlertClose}
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
