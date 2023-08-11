import React from "react";
import ReactPlayer from "react-player";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaHeart, FaRegStar, FaStar, FaPlusCircle } from "react-icons/fa";

const Video = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
      };
    return (
        <div className="home-container" > 
        <div className="d-flex flex-column justify-content-start align-items-center bg-black m-2 rounded-top">
            {/* video widget */}
            <div className="p-2 d-flex flex-column align-items-center m-3">
                <ReactPlayer className="video border border-white  "
                    url="http://127.0.0.1:8000/api/videos/video1.mp4"
                    controls
                />
            </div>
            </div>
       
            <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="lead fw-normal mb-0 d-flex align-items-center">
    <img
        className="user_img"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNVmFP2QMAnHxPCyCH442oXwKJeT5ey44L4hMZjPeK0Wi6au6gkagBcXO_QTx4ZdQviAA&usqp=CAU"
        alt=""
    />
    <div>
        <div className="user_name">Nhocac</div>
        <div className="m-2 text-muted"><p>Subscriber: 10</p></div>
    </div>
</div>

              <div className="mb-0 star_icon">
                <p> <FaPlusCircle size={20} className="mr-1" /> Add to WatchList</p>
               
              {[1, 2, 3, 4, 5].map((star, index) => (
                
                            index < 4 ?
                             
                      <FaStar key={index} size={20} className="mr-1" />     :
                     <FaRegStar key={index} size={20} className="mr-1" />  
                        ))}
              </div>
            </div>
            <hr className="mt-5"/>
            {/* User profile and interaction area */}
            <div>
      <h2 className="text-center">Relative Videos</h2>
      <Slider {...settings}  className="carousel-container ">
        <div>
        <ReactPlayer className="video_carousel"
                    url="https://youtu.be/OXO_iPk0hg0"
                    controls
                />
        </div>
        <div>
        <ReactPlayer className="video_carousel"
                    url="https://youtu.be/k_sB_5_0gTk"
                    controls
                />
        </div>
        <div>
        <ReactPlayer className="video_carousel"
                    url="https://youtu.be/OXO_iPk0hg0"
                    controls
                />
        </div>
        <div>
        <ReactPlayer className="video_carousel"
                    url="http://127.0.0.1:8000/api/videos/video1.mp4"
                    controls
                />
        </div> 
        
        <div>
        <ReactPlayer className="video_carousel"
                    url="https://youtu.be/OXO_iPk0hg0"
                    controls
                />
        </div> 
        <div>
        <ReactPlayer className="video_carousel"
                    url="https://youtu.be/OXO_iPk0hg0"
                    controls
                />
        </div> 
        {/* Add more items */}
      </Slider>
    </div>
           </div>
       

    );
};

export default Video;
