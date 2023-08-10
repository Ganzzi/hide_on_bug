import React from "react";
import VideoN from "../WatchList/VideoN";

const History = () => {
    return (
        <div>
            <h1>Your History</h1>
            <VideoN
                imageURL={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNVmFP2QMAnHxPCyCH442oXwKJeT5ey44L4hMZjPeK0Wi6au6gkagBcXO_QTx4ZdQviAA&usqp=CAU"
                }
                content={"how to drink water"}
                title={"news"}
            />
        </div>
    );
};

export default History;
