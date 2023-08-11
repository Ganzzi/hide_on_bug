import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        // Rest of your delete logic
    };

    const getProviders = async () => {
        setLoading(true);
        await axiosClient
            .get("/admin/providers")
            .then(({ data }) => {
                setLoading(false);
                setProviders(data.data); // Assuming the API response structure contains a "data" field
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <div>
                <h1>Providers</h1>
                <Link className="btn-add" to="/admin/providers/new">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown" style={{ left: "5rem" }}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Logo</th>
                            <th>Name</th>
                            <th>Created Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            providers.map((_provider) => (
                                <tr key={_provider.id}>
                                    <td>{_provider.id}</td>
                                    <td>
                                        <img
                                            src={
                                                `${import.meta.env.VITE_BASE_URL}/images/` +
                                                _provider.logo
                                            }
                                            width={50}
                                            height={50}
                                            alt=""
                                        />
                                    </td>
                                    <td>{_provider.service_name}</td>
                                    <td>{formatDateTime(_provider.created_at)}</td>
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={`/admin/providers/${_provider.id}/edit`} // Định hướng đến URL của trang EditForm
                                        >
                                            Edit
                                        </Link>{" "}

                                        <button
                                            className="btn-delete"
                                            onClick={() => onDeleteClick(_provider.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
