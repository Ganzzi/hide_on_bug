import React from "react";
import { logo } from "../../assets";

const Header = () => {
  return (
    <header className="header col-12 bg-black d-flex justify-content-between">
      {/* Logo */}
      <div className='ml-10'>
       
        <img src={logo} alt="" width={150} height={100}/>
      </div>
      
      {/* Search Bar */}
      <input type="text" className="search-bar" placeholder="Search" />
      
      {/* User Profile */}
      <div className="user-profile">
        <img src="profile-image.jpg" alt="User Profile" />
      
      </div>
    </header>
  );
}

export default Header;
