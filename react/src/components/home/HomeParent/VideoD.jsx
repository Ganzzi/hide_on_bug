import React from 'react';
import { limitText } from '../../../utils';

const VideoD = ({imageURL, title, content}) => {
  return (
  
       <div className="col">
    <div className="card">
      <img
        src={imageURL}
        className="card-img-top"
        alt="Skyscrapers"
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
        {limitText(content,100)}
        </p>
      </div>
    </div>
  </div>
 
  );
}

export default VideoD;
