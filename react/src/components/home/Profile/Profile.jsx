import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import UpdateProfileModal from "./UpdateProfileModal";

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [profileContent, setProfileContent] = useState({
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNVmFP2QMAnHxPCyCH442oXwKJeT5ey44L4hMZjPeK0Wi6au6gkagBcXO_QTx4ZdQviAA&usqp=CAU",
        name: "",
        email: "",
        bio: "",
        gender: "",
    });

    const handleUpdateProfile = async (formData) => {};

    return (
       
        <section className="h-100 gradient-custom-2">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-lg-9 col-xl-7">
        <div className="card">
          <div
            className="rounded-top text-white d-flex flex-row"
            style={{ backgroundColor: "#000", height: 200 }}
          >
            <div
              className="ms-4 mt-5 d-flex flex-column"
              style={{ width: 150 }}
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                alt="Generic placeholder image"
                className="img-fluid img-thumbnail mt-4 mb-2"
                style={{ width: 150, zIndex: 1 }}
              />
              <button
                type="button"
                className="btn btn-outline-dark"
                data-mdb-ripple-color="dark"
                style={{ zIndex: 1 }}
              >
                Edit profile
              </button>
            </div>
            <div className="ms-3" style={{ marginTop: 130 }}>
              <h5>Andy Horwitz</h5>
              
            </div>
          </div>
          <div
            className="p-4 text-black"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <div className="d-flex justify-content-end text-center py-1">
              <div>
                <p className="mb-1 h5">478</p>
                <p className="small text-muted mb-0">Following</p>
              </div>
            </div>
          </div>
          <div className="card-body p-4 text-black">
            <div className="mb-5">
              <p className="lead fw-normal mb-1">About</p>
              <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                <p className="font-italic mb-1">Web Developer</p>
                <p className="font-italic mb-1">Lives in New York</p>
                <p className="font-italic mb-0">Photographer</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="lead fw-normal mb-0">Thanks for joining us!</p>
              <p className="mb-0">
                <a href="#!" className="text-muted">
                  StreamTrace
                </a>
              </p>
            </div>
            
           
          </div>
        </div>
      </div>
    </div>
  </div>
 </section>
 
 

    );
};

export default Profile;
