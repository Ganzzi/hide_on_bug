import React, { useEffect, useRef, useState } from "react";
import { limitText } from "../../../utils";
import ReactPlayer from "react-player";
import VideoD from "./VideoD";
import axiosClient from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const menuRef = useRef(null);
    const [filmData, setFilmData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getFilms = async () => {
            await axiosClient.get(`recommended_films`).then(({ data }) => {
                console.log(data);
                setFilmData(data.recommend_films);
            });
        };

        getFilms();
    }, []);

    console.log(filmData);

    const scrollLeft = () => {
        menuRef.current.scrollBy({
            left: -200, // Adjust the scroll distance as needed
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        menuRef.current.scrollBy({
            left: 200, // Adjust the scroll distance as needed
            behavior: "smooth",
        });
    };
    return (
        <div className="home-container">
            <div className="menu-bar">
                <button className="arrow-button" onClick={scrollLeft}>
                    &lt;
                </button>
                <div className="menu" ref={menuRef}>
                    <a href="#" className="menu-item">
                        Home
                    </a>
                    <a href="#" className="menu-item">
                        Trending
                    </a>
                    <a href="#" className="menu-item">
                        Home
                    </a>
                    <a href="#" className="menu-item">
                        Trending
                    </a>{" "}
                    <a href="#" className="menu-item">
                        Home
                    </a>
                    <a href="#" className="menu-item">
                        Trending
                    </a>{" "}
                    <a href="#" className="menu-item">
                        Home
                    </a>
                    <a href="#" className="menu-item">
                        Trending
                    </a>{" "}
                    <a href="#" className="menu-item">
                        Home
                    </a>
                    <a href="#" className="menu-item">
                        Trending
                    </a>{" "}
                    <a href="#" className="menu-item">
                        Home
                    </a>
                    <a href="#" className="menu-item">
                        Trending
                    </a>{" "}
                    <a href="#" className="menu-item">
                        Home
                    </a>
                    <a href="#" className="menu-item">
                        Trending
                    </a>{" "}
                    <a href="#" className="menu-item">
                        Home
                    </a>
                    <a href="#" className="menu-item">
                        Trending
                    </a>
                    {/* Add more menu items */}
                </div>

                <button className="arrow-button" onClick={scrollRight}>
                    &gt;
                </button>
            </div>
            {/* card  */}
            <div className="row row-cols-3 g-3">
                {filmData.map((item) => (
                    <div
                        className="col"
                        onClick={() => {
                            navigate("/video/" + item.id);
                        }}
                    >
                        <div className="card">
                            {/* <ReactPlayer
                                className="video_home"
                                url={
                                    "http://127.0.0.1:8000/api/videos/" +
                                    item.video
                                }
                                controls
                            /> */}
                            <img
                                className="img-fluid rounded mb-3 mb-md-0"
                                src={
                                    `http://127.0.0.1:8000/api/images/` +
                                    item.film_poster
                                }
                                alt=""
                            />
                            <div className="card-body">
                                <h5 className="card-title">{item.film_name}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
