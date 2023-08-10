import React from "react";
import { limitText } from "../../../utils";
import VideoD from "./VideoD";
const Home = () => {
    return (
        <div className="container-fluid">
            <div className="row row-cols-3 g-4">
                <div className="col">
                    <div className="card">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
                            className="card-img-top"
                            alt="Hollywood Sign on The Hill"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                                {limitText(
                                    "  This is a longer card with supporting text below as a natural lead-in",
                                    100
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp"
                            className="card-img-top"
                            alt="Palm Springs Road"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                                {limitText(
                                    "  This is a longer card with supporting text below as a natural lead-in",
                                    100
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp"
                            className="card-img-top"
                            alt="Palm Springs Road"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                                {limitText(
                                    "  This is a longer card with supporting text below as a natural lead-in",
                                    100
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp"
                            className="card-img-top"
                            alt="Los Angeles Skyscrapers"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                                {limitText(
                                    "  This is a longer card with supporting text below as a natural lead-in",
                                    100
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp"
                            className="card-img-top"
                            alt="Skyscrapers"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                                {limitText(
                                    "  This is a longer card with supporting text below as a natural lead-in",
                                    100
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/new/standard/city/046.webp"
                            className="card-img-top"
                            alt="Skyscrapers"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                                {limitText(
                                    "  This is a longer card with supporting text below as a natural lead-in",
                                    100
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                {/* <VideoD imageURL={''} content={''}/> */}
                <div className="col">
                    <div className="card">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/new/standard/city/050.webp"
                            className="card-img-top"
                            alt="Skyscrapers"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                                {limitText(
                                    "  This is a longer card with supporting text below as a natural lead-in",
                                    100
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
