import React, { useEffect, useState } from "react";
import VideoN from "../WatchList/VideoN";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../../utils/axios";
import { useNavigate } from "react-router-dom";

const History = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getHistory = async () => {
            await axiosClient.get(`getHistory`).then(({ data }) => {
                setData(data.user_history.reverse());
            });
        };

        getHistory();
    }, []);

    return (
        <div className="home-container">
            <div>
                <>
                    <div className="container">
                        <h3 className="text-center h3-css">History Videos</h3>
                        {data.length != 0 &&
                            data.map((vid, i) => (
                                <>
                                    <hr />
                                    {/* Project One */}
                                    <div
                                        className="row"
                                        onClick={() =>
                                            navigate("/video/" + vid?.id)
                                        }
                                    >
                                        <div className="col-md-5">
                                            <a href="#">
                                                <img
                                                    className="img-fluid rounded mb-3 mb-md-0"
                                                    src={
                                                        `http://127.0.0.1:8000/api/images/` +
                                                        vid?.film_poster
                                                    }
                                                    alt=""
                                                />
                                            </a>
                                        </div>
                                        <div className="col-md-5">
                                            <h3>{vid?.film_name}</h3>
                                            <div className="d-flex flex-row">
                                                <img
                                                    src={
                                                        `http://127.0.0.1:8000/api/images/` +
                                                        vid?.provider_logo
                                                    }
                                                    alt=""
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                        borderRadius: 30,
                                                    }}
                                                />
                                                <p>{vid?.provider_name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                    </div>
                    {/* /.container */}
                </>
            </div>
        </div>
    );
};

export default History;
