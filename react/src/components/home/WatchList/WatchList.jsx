import React, { useEffect, useState } from "react";
import VideoN from "../WatchList/VideoN";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";


const WatchList = () =>
{
    const { watchlistId } = useParams();
    const navigate = useNavigate();

    const [sortState, setSortState] = useState("asc");
    const [films, setfilms] = useState([]);

    useEffect(() =>
    {
        if (sortState == "asc")
        {
            const sortedFilms = films.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
            );
            setfilms(sortedFilms);
        } else
        {
            const sortedFilmsDescending = films.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            setfilms(sortedFilmsDescending);
        }
    }, [sortState]);

    useEffect(() =>
    {
        const getWatlistVideo = async () =>
        {
            await axiosClient
                .get(`watchlists/${watchlistId}`)
                .then(({ data }) =>
                {
                    setfilms(data[0].films);
                });
        };

        getWatlistVideo();
    }, []);

    return (
        <div>
            {/* Page Content */}
            <div className="home-container">
                <div className="container">
                    {/* Page Heading */}

                    <div className="effect">
                        <h1 contentEditable className="h1_css">
                            HISTORY VIDEOS
                        </h1>
                    </div>
                    <h3>
                        <FontAwesomeIcon icon={faFilter} className="mr-2" />
                        Filter:
                    </h3>
                    <div className="btn-css">
                        <button
                            className="big-button"
                            onClick={() => setSortState("asc")}
                        >
                            Latest
                        </button>
                        <button
                            className="big-button"
                            onClick={() => setSortState("des")}
                        >
                            Oldest
                        </button>
                    </div>

                    {/* Project One */}
                    {films.map((film, index) => (
                        <div
                            className="row"
                            onClick={() =>
                            {
                                navigate("/video/" + film.id);
                            }}
                        >
                            <div className="col-md-5">
                                <a href="#">
                                    <img
                                        className="img-fluid rounded mb-3 mb-md-0"
                                        src={
                                            `http://127.0.0.1:8001/api/images/` +
                                            film.film_poster
                                        }
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div className="col-md-5">
                                <h3>{film.film_name}</h3>
                            </div>
                        </div>
                    ))}
                    <hr />
                </div>
                {/* /.container */}
            </div>
        </div>
    );
};

export default WatchList;
