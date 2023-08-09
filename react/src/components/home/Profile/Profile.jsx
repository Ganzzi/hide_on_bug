import React from 'react';

const Profile = () => {
  return (
    <header className="header col-12 bg-black d-flex justify-content-between">
      {/* Logo */}
      <div className="logo">Your Logo</div>
      
      {/* Search Bar */}
      <input type="text" className="search-bar" placeholder="Search" />
      
      {/* User Profile */}
      <div className="user-profile">
        <img src="profile-image.jpg" alt="User Profile" />
        <span>Username</span>
      </div>
    </header>
  );
}

export default Profile;