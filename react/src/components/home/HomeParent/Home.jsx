import React, { useEffect, useRef, useState } from "react";
import { limitText } from "../../../utils";
import ReactPlayer from "react-player";
import VideoD from "./VideoD";
import axiosClient from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
const Home = () =>
{
    const menuRef = useRef(null);
    const [filmData, setFilmData] = useState([]);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [filteredI, setFilteredI] = useState(-1);

<<<<<<< HEAD
    useEffect(() =>
    {
        const getFilms = async () =>
        {
            await axiosClient.get(`recommended_films`).then(({ data }) =>
            {
                console.log(data);
                setFilmData(data.recommend_films);
=======
    useEffect(() => {
        const getFilms = async () => {
            await axiosClient.get(`recommended_films`).then(({ data }) => {
                console.log(data.recommended_films);
                setFilmData(data.recommended_films);
>>>>>>> aa04e2ba62edbc30bd4177e9c3fb48c2e51f3be6
            });
        };
        const getCategory = async () => {
            await axiosClient.get(`admin/categories`).then(({ data }) => {
                setCategories(data.categories);
            });
        };

        getCategory();

        getFilms();
    }, []);

    console.log(filmData);

    const scrollLeft = () =>
    {
        menuRef.current.scrollBy({
            left: -200, // Adjust the scroll distance as needed
            behavior: "smooth",
        });
    };

    const scrollRight = () =>
    {
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
                    <p className="menu-item" onClick={() => setFilteredI(-1)}>
                        All
                    </p>
                    {categories &&
                        categories.map((cate) => (
                            <p
                                className="menu-item"
                                key={cate.id}
                                onClick={() => setFilteredI(cate.id)}
                            >
                                {cate?.cate_name}
                            </p>
                        ))}
                    {/* Add more menu items */}
                </div>

                <button className="arrow-button" onClick={scrollRight}>
                    &gt;
                </button>
            </div>
            {/* card  */}
            <h1>Recommend Films: </h1>
            <div className="row row-cols-3 g-3">
<<<<<<< HEAD
                {filmData.map((item) => (
                    <div
                        className="col"
                        onClick={() =>
                        {
                            navigate("/video/" + item.id);
                        }}
                    >
                        <div className="card">
                            <ReactPlayer
=======
                {filmData &&
                    filmData.map((item) => {
                        if (filteredI != -1) {
                            let found = false;
                            for (let i = 0; i < item.categories.length; i++) {
                                if (item.categories[i].id == filteredI) {
                                    found = true;
                                }
                            }

                            if (found) {
                                return (
                                    <div
                                        className="col"
                                        onClick={() => {
                                            navigate("/video/" + item.id);
                                        }}
                                    >
                                        <div className="card">
                                            {/* <ReactPlayer
>>>>>>> aa04e2ba62edbc30bd4177e9c3fb48c2e51f3be6
                                className="video_home"
                                url={
                                    "http://127.0.0.1:8001/api/videos/" +
                                    item.video
                                }
                                controls
<<<<<<< HEAD
                            />
                            <img
                                className="img-fluid rounded mb-3 mb-md-0"
                                src={
                                    `http://127.0.0.1:8001/api/images/` +
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
=======
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
                                                <h5 className="card-title">
                                                    {item.film_name}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        } else {
                            return (
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
                                            <h5 className="card-title">
                                                {item.film_name}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
>>>>>>> aa04e2ba62edbc30bd4177e9c3fb48c2e51f3be6
            </div>
        </div>
    );
};

export default Home;
