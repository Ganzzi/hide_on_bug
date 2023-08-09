import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axiosClient from "../../../utils/axios.js";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import { formatDateTime } from "../../../utils/index.js";

export default function Films() {
    let { providerId } = useParams();
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setAlerts } = useStateContext();

    // useEffect(() => {
    //     getFilms();
    // }, []);

    const onDeleteClick = async (filmId) => {
        if (!window.confirm("Are you sure you want to delete this film?")) {
            return;
        }
        // await axiosClient
        //     .delete(`/admin/films/${filmId}`)
        //     .then(async () => {
        //         setAlerts({
        //             type: "info",
        //             message: "user was successfully deleted",
        //             time: new Date(),
        //         });
        //         await getFilms();
        //     });
    };

    const getFilms = async () => {
        setLoading(true);
        await axiosClient
            .get("/admin/films")
            .then(({ data }) => {
                setLoading(false);
                setFilms(data.data);
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
                <Link
                    className="btn-add"
                    to={`/admin/providers/${providerId}/films/new`}
                >
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown" style={{ left: "5rem" }}>
                <table
                    className=""
                    style={{ with: "100%", paddingRight: "3rem" }}
                >
                    <thead className="thead-dark" style={{ with: "100%" }}>
                        <tr>
                            <th style={{ paddingRight: "7rem" }}>ID</th>
                            <th style={{ paddingRight: "7rem" }}>Image</th>
                            <th style={{ paddingRight: "7rem" }}>Name</th>
                            <th style={{ paddingRight: "7rem" }}>
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
                            {/* {providers.map((_film) => (
                                <tr key={_film.id}>
                                    <td>{_film.id}</td>
                                    <td>
                                        <img
                                            src={
                                                `${
                                                    import.meta.env
                                                        .VITE_BASE_URL
                                                }/api/images/` + _film.image
                                            }
                                            width={50}
                                            height={50}
                                            alt=""
                                        />
                                    </td>
                                    <td>{_film.name}</td>
                                    <td>
                                        {" "}
                                        {formatDateTime(_film.created_at)}
                                    </td>
                                    <td>
                                        {_film.role_id != 1 && (
                                            <>
                                                <Link
                                                    className="btn-edit"
                                                    to={
                                                        "/admin/providers/" +
                                                        _film.id
                                                    }
                                                >
                                                    Edit
                                                </Link>
                                                &nbsp;
                                                <button
                                                    className="btn-delete"
                                                    onClick={() =>
                                                        onDeleteClick(
                                                            _film.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))} */}

                            <tr key={_film.id}>
                                <td>{_film.id}</td>
                                <td>
                                    <img
                                        src={
                                            `${
                                                import.meta.env.VITE_BASE_URL
                                            }/api/images/` + _film.image
                                        }
                                        width={50}
                                        height={50}
                                        alt=""
                                    />
                                </td>
                                <td>{_film.name}</td>
                                <td> {formatDateTime(_film.created_at)}</td>
                                <td>
                                    <Link
                                        className="btn-edit"
                                        to={`/admin/providers/${providerId}/films/${_film.id}`}
                                    >
                                        Edit
                                    </Link>
                                    &nbsp;
                                    <button
                                        className="btn-delete"
                                        onClick={() => onDeleteClick(_film.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

const _film = {
    id: 2,
    name: "pepsi",
    image: "avc",
    created_at: "none",
};
