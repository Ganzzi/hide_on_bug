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
        <div className="">
            <div className="d-flex flex-column  justify-content-center align-items-center my-3">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNVmFP2QMAnHxPCyCH442oXwKJeT5ey44L4hMZjPeK0Wi6au6gkagBcXO_QTx4ZdQviAA&usqp=CAU"
                    alt=""
                    style={{
                        width: 200,
                        height: 200,
                        borderRadius: 200,
                    }}
                />
                <div className="d-flex flex-row">
                    <h1>duyan</h1>
                    <div
                        className="d-flex justify-content-center align-items-center mx-1 px-1"
                        onClick={() => {
                            setShowModal(true);
                        }}
                    >
                        <AiFillEdit size={30} />
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="update-modal">
                        <UpdateProfileModal
                            profileContent={profileContent}
                            closeModal={() => {
                                setShowModal(false);
                            }}
                            onUpdate={handleUpdateProfile}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
