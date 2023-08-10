import { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { Header } from "../components";

import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../utils/axios";

import { formatDateTime } from "../utils";

export default function Homescreen() {
    const { user, token, setUser, setToken, alerts, setAlerts } =
        useStateContext();
    const [userDataFetched, setUserDataFetched] = useState(false);
    const [searchRequest, setSearchRequest] = useState("");
    const [showSearchResponse, setShowSearchResponse] = useState(false);
    const [searchData, setSearchData] = useState([]);

    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(true);

    // useEffect to show alert in home page
    useEffect(() => {
        setShowAlert(true);
        const timer = setTimeout(() => {
            setShowAlert(false);
            setAlerts({
                type: null,
                message: null,
                time: null,
            });
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [alerts]);

    // useEffect to get data base on token
    useEffect(() => {
        if (token) {
            axiosClient
                .get("/user")
                .then(({ data }) => {
                    setUser(data);
                    setUserDataFetched(true);
                })
                .catch((err) => {
                    const response = err.response;

                    if (response && response.status === 401) {
                        console.error(response.status); // Access the status code
                        console.error(response.data.message);
                        localStorage.removeItem("ACCESS_TOKEN");
                    }
                });
        }
    }, [token, setUser]);

    // function to get user result when search
    const handleSearchUsers = async (e) => {
        e.preventDefault();
    };

    // protected navigation
    if (!token) {
        return <Navigate to={"/"} />;
    } else if (token && user.role_id == 1 && userDataFetched) {
        return <Navigate to={"/admin"} />;
    }

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
        <div id="homeLayout" className="">
            {/* Home Page Header */}
            <Header />
            <div className="row">
                <div className="sideBar-Home col-3 d-flex flex-column">
                    {/* sideBar-Home  */}
                    <h1>hello</h1>
                </div>
                {/* Main content */}{" "}
                {user.role_id != 1 && (
                    <div className="col-9">
                        <Outlet />
                    </div>
                )}
            </div>

            {/* Alert */}
            {showAlert && alerts.type && (
                <div
                    className="alert-home"
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
                        onClick={() => {
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
