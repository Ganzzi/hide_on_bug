import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../utils/axios";

export default function GuestLayout() {
    const { user, token, setUser } = useStateContext();
    const [userDataFetched, setUserDataFetched] = useState(false);

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
                    console.error("dmm");
                    const response = err.response;

                    if (response && response.status === 401) {
                        console.error(response.status); // Access the status code
                        console.error(response.data.message);
                    }
                });
        }
    }, [token]);

    // protected navigation
    if (token && userDataFetched) {
        if (user.role_id == 1) {
            return <Navigate to={"/admin"} />;
        } else {
            console.log("navigating...");
            return <Navigate to={"/home"} />;
        }
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}
