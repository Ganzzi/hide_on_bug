import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axiosClient from "../../../utils/axios.js";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import { formatDateTime } from "../../../utils/index.js";

export default function Providers() {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setAlerts } = useStateContext();

    useEffect(() => {
        getProviders();
    }, []);

    const onDeleteClick = async (providerId) => {
        if (!window.confirm("Are you sure you want to delete this provider?")) {
            return;
        }
        // await axiosClient
        //     .delete(`/admin/providers/${providerId}`)
        //     .then(async () => {
        //         setAlerts({
        //             type: "info",
        //             message: "Provider was successfully deleted",
        //             time: new Date(),
        //         });
        //         await getProviders();
        //     });
    };

    const getProviders = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/admin/providers");
            setProviders(response.data.data);
        } catch (error) {
            console.error("Error fetching providers:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Providers</h1>
                <Link className="btn-add" to="/admin/providers/new">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown" style={{ left: "5rem" }}>
                <table className="" style={{ width: "100%", paddingRight: "3rem" }}>
                    <thead className="thead-dark" style={{ width: "100%" }}>
                        <tr>
                            <th style={{ paddingRight: "7rem" }}>ID</th>
                            <th style={{ paddingRight: "7rem" }}>Logo</th>
                            <th style={{ paddingRight: "7rem" }}>Service Name</th>
                            <th style={{ paddingRight: "7rem" }}>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {providers.map((_provider) => (
                                <tr key={_provider.id}>
                                    <td>{_provider.id}</td>
                                    <td>
                                        <img
                                            src={
                                                `${
                                                    import.meta.env.VITE_BASE_URL
                                                }/api/images/` + _provider.logo
                                            }
                                            width={50}
                                            height={50}
                                            alt=""
                                        />
                                    </td>
                                    <td>{_provider.service_name}</td>
                                    <td> {formatDateTime(_provider.created_at)}</td>
                                    <td>
                                        <Link className="btn-edit" to={`/admin/providers/${_provider.id}`}>
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button className="btn-delete" onClick={() => onDeleteClick(_provider.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
