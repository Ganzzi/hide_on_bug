import React from 'react';
import { limitText } from '../../../utils';
 
 
const Subcribed = () => {
  return (
    <div className="home-container "> 
    <div className="d-flex flex-column  justify-content-center  my-3 rounded-top backgr ">
       <div className="d-flex flex-row  m-3">
    <img  className="ChannelImg border border-info shadow p-2 bg-light "
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNVmFP2QMAnHxPCyCH442oXwKJeT5ey44L4hMZjPeK0Wi6au6gkagBcXO_QTx4ZdQviAA&usqp=CAU"
        alt=""
       
    />
       <div className="horizontal-container">
  <h3 className="mt-4 text-danger">Duyan</h3>
  <div className="figcaption-container">
    <figcaption className="blockquote-footer mt-4">
      Attended in <cite title="Source Title">11/10/2023</cite>
    </figcaption>
    <figcaption className="blockquote-footer mt-2">
      Subscribers: <cite title="Source Title">20N</cite>
    </figcaption>
    <figcaption className="blockquote-footer mt-2">
      Videos: <cite title="Source Title">20</cite>
    </figcaption>
  </div>
</div>

        
    </div>
</div>
 
<div className="d-flex flex-column  justify-content-center align-items-center my-3 rounded-top z-index backgr">
<h3 className="mt-4 text-light lead">Videos</h3>
       {/* card  */}
<div className="row row-cols-4 g-2 m-3">
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
        {limitText('  This is a longer card with supporting text below as a natural lead-in',100)}
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
        {limitText('  This is a longer card with supporting text below as a natural lead-in',100)}
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
        {limitText('  This is a longer card with supporting text below as a natural lead-in',100)}
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
        {limitText('  This is a longer card with supporting text below as a natural lead-in',100)}
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
        {limitText('  This is a longer card with supporting text below as a natural lead-in',100)}
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
        {limitText('  This is a longer card with supporting text below as a natural lead-in',100)}
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
         
        {limitText('  This is a longer card with supporting text below as a natural lead-in',100)}
        </p>
      </div>
    </div>
  </div>
</div>
   </div>
</div>
 
  );
}

export default Subcribed;