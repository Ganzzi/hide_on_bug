import React from "react";
import { limitText } from "../../../utils";

const VideoN = ({ imageURL, title, content }) =>
{
    return (
        <div className="col">
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={imageURL} className="card-img" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{limitText(content, 100)}</p>
                            <p className="card-text">
                                <small className="text-muted">
                                    {limitText(content, 100)}
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoN;
