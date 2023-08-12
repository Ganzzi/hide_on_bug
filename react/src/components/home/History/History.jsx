import React, { useEffect, useState } from "react";
import VideoN from "../WatchList/VideoN";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../../utils/axios";

const History = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getHistory = async () => {
            await axiosClient.get(`getHistory`).then(({ data }) => {
                setData(data.user_history);
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
                        <hr />

                        {/* Project One */}
                        <div className="row">
                            <div className="col-md-5">
                                <a href="#">
                                    <img
                                        className="img-fluid rounded mb-3 mb-md-0"
                                        src="https://static2.vieon.vn/vieplay-image/carousel_web_v4/2022/04/12/1wdneh1x_1920x1080-xedotkich_1920_1080.jpg"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div className="col-md-5">
                                <h3>Project One</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Laudantium veniam
                                    exercitationem expedita laborum at
                                    voluptate. Labore, voluptates totam at aut
                                    nemo deserunt rem magni pariatur quos
                                    perspiciatis atque eveniet unde.
                                </p>
                            </div>
                        </div>
                        {/* /.row */}
                        <hr />
                        {/* Project Two */}
                        <div className="row">
                            <div className="col-md-5">
                                <a href="#">
                                    <img
                                        className="img-fluid rounded mb-3 mb-md-0"
                                        src="https://via.placeholder.com/700x300"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div className="col-md-5">
                                <h3>Project Two</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Ut, odit velit cumque vero
                                    doloremque repellendus distinctio maiores
                                    rem expedita a nam vitae modi quidem
                                    similique ducimus! Velit, esse totam
                                    tempore.
                                </p>
                            </div>
                        </div>
                        {/* /.row */}
                        <hr />
                        {/* Project Three */}
                        <div className="row">
                            <div className="col-md-5">
                                <a href="#">
                                    <img
                                        className="img-fluid rounded mb-3 mb-md-0"
                                        src="https://via.placeholder.com/700x300"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div className="col-md-5">
                                <h3>Project Three</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Omnis, temporibus,
                                    dolores, at, praesentium ut unde repudiandae
                                    voluptatum sit ab debitis suscipit fugiat
                                    natus velit excepturi amet commodi deleniti
                                    alias possimus!
                                </p>
                            </div>
                        </div>
                        {/* /.row */}
                        <hr />
                        {/* Project Four */}
                        <div className="row">
                            <div className="col-md-5">
                                <a href="#">
                                    <img
                                        className="img-fluid rounded mb-3 mb-md-0"
                                        src="https://via.placeholder.com/700x300"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div className="col-md-5">
                                <h3>Project Four</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Explicabo, quidem,
                                    consectetur, officia rem officiis illum
                                    aliquam perspiciatis aspernatur quod modi
                                    hic nemo qui soluta aut eius fugit quam in
                                    suscipit?
                                </p>
                            </div>
                        </div>
                        {/* /.row */}
                        <hr />
                    </div>
                    {/* /.container */}
                </>
            </div>
        </div>
    );
};

export default History;
