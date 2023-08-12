import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

import axiosClient from "../../../utils/axios.js";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import { formatDateTime } from "../../../utils/index.js";

export default function Providers ()
{
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setAlerts } = useStateContext();
    const [providerId, setProviderId] = useState(null);
    const [service_name, setService_name] = useState("");
    const location = useLocation();

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState("");

    const openModal = (video) =>
    {
        setCurrentVideo(video);
        setIsOpen(true);
    };

    useEffect(() =>
    {
        setFilms(location?.state.films);
        setProviderId(location?.state.providerId);
        setService_name(location.state.service_name);
    }, []);

    const onDeleteClick = async (filmId) =>
    {
        if (!window.confirm("Are you sure you want to delete this provider?"))
        {
            return;
        }
        await axiosClient.delete(`/admin/films/${filmId}`).then(async () =>
        {
            setAlerts({
                type: "info",
                message: "Provider was successfully deleted",
                time: new Date(),
            });
            navigate(`/admin/providers/${providerId}`);
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
             <i ><h3 > <FontAwesomeIcon icon={faBookmark} /> Films of <i className="text-danger">{service_name}</i> </h3></i>    
                <button
                    className="btn-add"
                    onClick={() => {
                        navigate(`/admin/providers/${providerId}/films/new`, {
                            state: {
                                providerId: providerId,
                                service_name: service_name,
                            },
                        });
                    }}
                >
                  <i>Add new Film</i>   
                </button>
            </div>
            <div className="card animated fadeInDown" style={{ left: "5rem" }}>
                <table
                    className=""
                    style={{ width: "100%", paddingRight: "3rem" }}
                >
                    <thead className="thead-dark" style={{ width: "100%" }}>
                        <tr>
                            <th style={{ paddingRight: "7rem" }}>ID</th>
                            <th style={{ paddingRight: "7rem" }}>Video</th>
                            <th style={{ paddingRight: "7rem" }}>Film Name</th>
                            <th style={{ paddingRight: "7rem" }}>
                                Premiere Date
                            </th>
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
                            {films.map((_film) => (
                                <tr key={_film.id}>
                                    <td>{_film.id}</td>
                                    <td>
                                        {/* <video width="50" height="50" controls>
                                            src={
                                                `${import.meta.env
                                                    .VITE_BASE_URL
                                                }/api/video/` +
                                                _film.video
                                            }
                                        </video> */}




                                        <div
                                            onClick={() => openModal(_film.video)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <img
                                                src={`${import.meta.env.VITE_BASE_URL}/api/images/` + _film.film_poster}
                                                width={50}
                                                height={50}
                                                alt=""
                                            />
                                        </div>
                                        <ModalVideo
                                            channel="custom"
                                            isOpen={isOpen && currentVideo === _film.video}
                                            url={`${import.meta.env.VITE_BASE_URL}/api/videos/${_film.video}`}
                                            onClose={() => setIsOpen(false)}
                                        />

                                    </td>

                                    <td>{_film.film_name}</td>
                                    <td>
                                        {" "}
                                        {formatDateTime(_film.premiere_date)}
                                    </td>
                                    <td> {formatDateTime(_film.created_at)}</td>
                                    <td>
                                        <button
                                            className="btn-edit"
                                            onClick={() =>
                                            {
                                                navigate(
                                                    `/admin/providers/${_film.stream_service_provider_id}/films/${_film.id}`,
                                                    {
                                                        state: {
                                                            providerId:
                                                                providerId,
                                                            service_name:
                                                                service_name,
                                                        },
                                                    }
                                                );
                                            }}
                                        >
                                            Edit
                                        </button>
                                        &nbsp;
                                        <button
                                            className="btn-delete"
                                            onClick={() =>
                                                onDeleteClick(_film.id)
                                            }
                                        >
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
