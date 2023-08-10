import React from "react";
import ReactPlayer from "react-player";
import { FaHeart, FaRegStar, FaStar } from "react-icons/fa";

const Video = () => {
    return (
        <div className="d-flex flex-column justify-content-start align-items-center">
            <div
                className="d-flex flex-column justify-content-start align-items-center my-3"
                style={{
                    width: "80%",
                }}
            >
                {/* video widget */}
                <div className="p-2" style={{ width: "100%" }}>
                    <ReactPlayer
                        url="http://127.0.0.1:8000/api/videos/video1.mp4"
                        controls
                        width={"100%"}
                        height={600}
                    />
                </div>

                {/* description */}
                <div
                    className="d-flex flex-row justify-content-between"
                    style={{ width: "100%" }}
                >
                    <div className="d-flex flex-row align-items-center">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNVmFP2QMAnHxPCyCH442oXwKJeT5ey44L4hMZjPeK0Wi6au6gkagBcXO_QTx4ZdQviAA&usqp=CAU"
                            alt=""
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 80,
                            }}
                        />
                        <div className="d-flex flex-column align-items-start justify-content-center mx-2">
                            <p>nameee</p>
                            <button className="btn btn-primary">
                                subscribe
                            </button>
                        </div>
                    </div>
                    <div className="d-flex flex-row">
                        {[1, 2, 3, 4, 5].map((start, index) => {
                            if (index < 4) {
                                return <FaStar size={30} />;
                            } else {
                                return <FaRegStar size={30} />;
                            }
                        })}

                        <FaHeart
                            size={40}
                            style={{
                                marginLeft: 15,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Video;
