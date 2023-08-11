import React from "react";
import VideoN from "../WatchList/VideoN";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilter } from '@fortawesome/free-solid-svg-icons';
const WatchList = () => {
    return (
        // <div>
        //     <h1>Your History</h1>
        //     <VideoN
        //         imageURL={
        //             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNVmFP2QMAnHxPCyCH442oXwKJeT5ey44L4hMZjPeK0Wi6au6gkagBcXO_QTx4ZdQviAA&usqp=CAU"
        //         }
        //         content={"how to drink water"}
        //         title={"news"}
        //     />
        // </div>
        <div>
      
        {/* Page Content */}
        <div className="home-container"> 
       
        <div className="container">
          {/* Page Heading */}
           
          <div className="effect"> 
  <h1 contenteditable className="h1_css">HISTORY VIDEOS</h1>
 </div>
 <h3><FontAwesomeIcon icon={faFilter} className="mr-2"/>Filter:</h3>
 <div className="btn-css"> 
 <button className="big-button">Latest</button>
<button className="big-button">Oldest</button>
</div>
 
        
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium
                veniam exercitationem expedita laborum at voluptate. Labore,
                voluptates totam at aut nemo deserunt rem magni pariatur quos
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, odit
                velit cumque vero doloremque repellendus distinctio maiores rem
                expedita a nam vitae modi quidem similique ducimus! Velit, esse totam
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis,
                temporibus, dolores, at, praesentium ut unde repudiandae voluptatum
                sit ab debitis suscipit fugiat natus velit excepturi amet commodi
                deleniti alias possimus!
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo,
                quidem, consectetur, officia rem officiis illum aliquam perspiciatis
                aspernatur quod modi hic nemo qui soluta aut eius fugit quam in
                suscipit?
              </p>
               
            </div>
          </div>
          {/* /.row */}
          <hr />
                 </div>
        {/* /.container */}
   
      </div>
      </div>

    );
};

export default WatchList;
