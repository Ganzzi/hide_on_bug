import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaHeart, FaRegStar, FaStar, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axiosClient from "../../../utils/axios";

const Video = () => {
    const { videoId } = useParams();

    const [data, setData] = useState({
        created_at: null,
        film_name: null,
        film_poster: null,
        id: null,
        premiere_date: null,
        stream_service_provider_id: null,
        updated_at: null,
        video: null,
    });
    const [rating, setRating] = useState(0);

    const [providerData, setProviderData] = useState({
        provider_logo: null,
    });
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        const getVideo = async () => {
            await axiosClient.get(`/films/${videoId}`).then(({ data }) => {
                console.log(data);
                setData(data.film);
                setProviderData(data.provider[0]);
                setRating(data.average_rating ? data.average_rating : 0);
            });
        };

        getVideo();
    }, []);

    const favoriteFilm = async () => {
        await axiosClient
            .post("update_favorite", {
                user_id: 3,
                film_id: 3,
            })
            .then(() => {
                setIsFavorited(!isFavorited);
            });
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };
    return (
        <div className="home-container">
            <div className="d-flex flex-column justify-content-start align-items-center bg-black m-2 rounded-top">
                {/* video widget */}
                <div className="p-2 d-flex flex-column align-items-center m-3">
                    <ReactPlayer
                        className="video border border-white  "
                        url={`http://127.0.0.1:8000/api/videos/` + data.video}
                        controls
                    />
                </div>
            </div>

            <h2>{data.film_name}</h2>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="lead fw-normal mb-0 d-flex align-items-center">
                    <img
                        className="user_img"
                        src={
                            `http://127.0.0.1:8000/api/images/` +
                            providerData.provider_logo
                        }
                        alt=""
                    />
                    <div>
                        <div className="user_name">
                            {providerData.provider_name}
                        </div>
                    </div>
                </div>

                <div className="mb-0 star_icon" onClick={favoriteFilm}>
                    <p>
                        <FaPlusCircle size={20} className="mr-1" />{" "}
                        {isFavorited ? (
                            <p>added to favorite</p>
                        ) : (
                            <p>Add to Favorite</p>
                        )}
                    </p>

                    {[1, 2, 3, 4, 5].map((star, index) =>
                        index < rating ? (
                            <FaStar key={index} size={20} className="mr-1" />
                        ) : (
                            <FaRegStar key={index} size={20} className="mr-1" />
                        )
                    )}
                </div>
            </div>
            <hr className="mt-5" />
            {/* User profile and interaction area */}
            <div>
                <h2 className="text-center">Relative Videos</h2>
                <Slider {...settings} className="carousel-container ">
                    <div>
                        <ReactPlayer
                            className="video_carousel"
                            url=""
                            controls
                        />
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default Video;
