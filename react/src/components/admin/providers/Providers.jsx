import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axiosClient from "../../../utils/axios.js";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import { formatDateTime } from "../../../utils/index.js";

export default function Providers() {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setAlerts } = useStateContext();

    const navigate = useNavigate();

    useEffect(() => {
        getProviders();
    }, []);

    const onDeleteClick = async (providerId) => {
        if (!window.confirm("Are you sure you want to delete this provider?")) {
            return;
        }
        // Rest of your delete logic
        try {
            const response = await axiosClient.delete(
                `/admin/providers/${providerId}`
            );
            if (response.status === 200) {
                // Remove the deleted provider from the providers state
                setProviders((prevProviders) =>
                    prevProviders.filter(
                        (provider) => provider.id !== providerId
                    )
                );
                setAlerts([
                    {
                        type: "success",
                        message: "Provider deleted successfully",
                    },
                ]);
            } else {
                setAlerts([
                    { type: "error", message: "Failed to delete provider" },
                ]);
            }
        } catch (error) {
            setAlerts([
                {
                    type: "error",
                    message: "An error occurred while deleting provider",
                },
            ]);
        }
    };

    const getProviders = async () => {
        setLoading(true);
        await axiosClient
            .get("/admin/providers")
            .then(({ data }) => {
                setLoading(false);
                setProviders(data);
            })
            .catch(() => {
                setLoading(false);
            });
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
                <h1
                    style={{
                        fontFamily: "fantasy",
                        justifycontent: "space-between",
                    }}
                ></h1>
                <Link className="btn-add bg-black" to="/admin/providers/new">
                   <i>Add New Provider</i>  
                </Link>
            </div>
            <div className="card animated fadeInDown" style={{ left: "5rem" }}>
                <table
                    className=""
                    style={{ with: "100%", paddingRight: "3rem" }}
                >
                    <thead className="thead-dark" style={{ with: "100%" }}>
                        <tr>
                            <th style={{ paddingRight: "4rem" }}>ID</th>
                            <th style={{ paddingRight: "4rem" }}>
                                Service Name
                            </th>
                            <th style={{ paddingRight: "4rem" }}>Logo</th>
                            <th style={{ paddingRight: "4rem" }}>Users</th>
                            <th style={{ paddingRight: "4rem" }}>Films</th>
                            <th style={{ paddingRight: "4rem" }}>
                                Create Date
                            </th>
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
                                    <td>{_provider.provider_name}</td>
                                    <td>
                                        <img
                                            src={
                                                `${
                                                    import.meta.env
                                                        .VITE_BASE_URL
                                                }/images/` +
                                                _provider.provider_logo
                                            }
                                            width={50}
                                            height={50}
                                            alt=""
                                        />
                                    </td>
                                    <td>{_provider.users.length} subcribers</td>
                                    <td className="film_hover"
                                        onClick={() => {
                                            navigate(
                                                `/admin/providers/${_provider.id}/films`,
                                                {
                                                    state: {
                                                        films: _provider.films,
                                                        providerId:
                                                            _provider.id,
                                                        service_name:
                                                            _provider.provider_name,
                                                    },
                                                }
                                            );
                                        }}
                                    >
                                        {_provider.films.length} films
                                    </td>

                                    <td>
                                        {formatDateTime(_provider.created_at)}
                                    </td>
                                    <td>
                                        {_provider.role_id != 1 && (
                                            <>
                                                <Link
                                                    className="btn-edit"
                                                    to={
                                                        "/admin/providers/" +
                                                        _provider.id
                                                    }
                                                >
                                                    Edit
                                                </Link>
                                                &nbsp;
                                                <button
                                                    className="btn-delete"
                                                    onClick={() =>
                                                        onDeleteClick(
                                                            _provider.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
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
