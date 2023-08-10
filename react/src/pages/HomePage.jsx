import { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { Header } from "../components";

import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../utils/axios";

import { formatDateTime } from "../utils";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';




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
            <div className="container-fluid"> 
            <div className="row">
                <div className="sideBar-Home col-3 d-flex flex-column">
                    {/* sideBar-Home  */}

 
                    <Menu className="Menu">
                    <hr />
                        <MenuItem onClick={() => {
                            navigate('home')
                        }}> <i className="m-2">  <FontAwesomeIcon icon={faHome} /></i>Home </MenuItem>
                        <SubMenu label="Watch List" >
                            <MenuItem onClick={() => {
                            navigate('watchList/'+1)
                        }}> Wl1 </MenuItem>
                            <MenuItem onClick={() => {
                            navigate('watchList/'+2)
                        }}> WL2 </MenuItem>
                        </SubMenu>
                        <MenuItem onClick={() => {
                            navigate('history')
                        }}><i className="m-1"><FontAwesomeIcon icon={faArrowRotateLeft} /></i> History </MenuItem>
                        <MenuItem onClick={() => {
                            navigate('subcribed/'+1)
                        }}> Subcribed </MenuItem>
                        <MenuItem onClick={() => {
                            navigate('profile')
                        }}> <i className="m-1"><FontAwesomeIcon icon={faUserPlus} /></i> Profile </MenuItem>
                        <hr />
                        <h5 className="text-center"> Other Service Of StreamTrace </h5>
                        <MenuItem> <i className="m-1"><FontAwesomeIcon icon={faStar} color="yellow" /></i> A Week Premium </MenuItem>
                        <MenuItem> <i className="m-1"><FontAwesomeIcon icon={faStar} color="yellow" /></i> A Month Premium </MenuItem>
                        <MenuItem> <i className="m-1"><FontAwesomeIcon icon={faStar} color="yellow" /></i> A Year Premium </MenuItem>
                        <hr />
                        <h5 className="text-center"> Privacy & Contact </h5>
                        <div class="d-flex flex-column bd-highlight mb-3">
                          
                                <div class="p-2 bd-highlight">Contact Us</div> 
                            <div class="p-2 bd-highlight">Site Map</div> 
                            <div class="p-2 bd-highlight">HotLine: +0123256789</div> 
                            <div class="p-2 bd-highlight">Address: 590 CMT8 Distric 3</div> 

                        </div>



                    </Menu>

                </div>
                 {/* Main content */} {user.role_id != 1 && <div className="col-9"><Outlet /></div>}
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
