import React from "react";
import VideoN from "./VideoN";

const WatchList = () => {
    return (
        <div className="d-flex flex-column">
            <div className="d-flex flex-row my-2 py-2">
                <button className="btn btn-primary px-4 mx-3">newest</button>
                <button className="btn btn-primary px-4 mx-3">oldest</button>
            </div>
            <div className="d-flex flex-column">
                <VideoN
                    imageURL={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNVmFP2QMAnHxPCyCH442oXwKJeT5ey44L4hMZjPeK0Wi6au6gkagBcXO_QTx4ZdQviAA&usqp=CAU"
                    }
                    content={"how to drink water"}
                    title={"news"}
                />
                <VideoN
                    imageURL={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNVmFP2QMAnHxPCyCH442oXwKJeT5ey44L4hMZjPeK0Wi6au6gkagBcXO_QTx4ZdQviAA&usqp=CAU"
                    }
                    content={"how to drink water"}
                    title={"news"}
                />
                <VideoN
                    imageURL={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNVmFP2QMAnHxPCyCH442oXwKJeT5ey44L4hMZjPeK0Wi6au6gkagBcXO_QTx4ZdQviAA&usqp=CAU"
                    }
                    content={"how to drink water"}
                    title={"news"}
                />
                <VideoN
                    imageURL={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNVmFP2QMAnHxPCyCH442oXwKJeT5ey44L4hMZjPeK0Wi6au6gkagBcXO_QTx4ZdQviAA&usqp=CAU"
                    }
                    content={"how to drink water"}
                    title={"news"}
                />
            </div>
        </div>
    );
};

export default WatchList;
