import React, { useRef } from 'react';
import { limitText } from '../../../utils';
import VideoD from './VideoD';
const Home = () => {
  const menuRef = useRef(null);

  const scrollLeft = () => {
    menuRef.current.scrollBy({
      left: -200, // Adjust the scroll distance as needed
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    menuRef.current.scrollBy({
      left: 200, // Adjust the scroll distance as needed
      behavior: 'smooth',
    });
  };
  return (
    <div className="home-container">
    <div className="menu-bar">
    <button className="arrow-button" onClick={scrollLeft}>
          &lt;
        </button>
      <div className="menu" ref={menuRef}>
        <a href="#" className="menu-item">Home</a>
        <a href="#" className="menu-item">Trending</a>
        <a href="#" className="menu-item">Home</a>
        <a href="#" className="menu-item">Trending</a> <a href="#" className="menu-item">Home</a>
        <a href="#" className="menu-item">Trending</a> <a href="#" className="menu-item">Home</a>
        <a href="#" className="menu-item">Trending</a> <a href="#" className="menu-item">Home</a>
        <a href="#" className="menu-item">Trending</a> <a href="#" className="menu-item">Home</a>
        <a href="#" className="menu-item">Trending</a> <a href="#" className="menu-item">Home</a>
        <a href="#" className="menu-item">Trending</a> <a href="#" className="menu-item">Home</a>
        <a href="#" className="menu-item">Trending</a>
        {/* Add more menu items */}
      </div>
      
        
        <button className="arrow-button" onClick={scrollRight}>
          &gt;
        </button>
      
    </div>
{/* card  */}
<div className="row row-cols-3 g-3">
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
 
 

  );
}

export default Home;
