import React from "react";
import { limitText } from "../../../utils";

const VideoN = ({ imageURL, title, content }) => {
    return (
        <div className="col">
            <div class="card mb-3">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src={imageURL} class="card-img" alt="..." />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{title}</h5>
                            <p class="card-text">{limitText(content, 100)}</p>
                            <p class="card-text">
                                <small class="text-muted">
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
