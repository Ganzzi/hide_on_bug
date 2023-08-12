import React, { useEffect, useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../utils/axios";

const UpdateProfileModal = ({ closeModal, onUpdate }) => {
    const { user } = useStateContext();

    const [hasChanges, setHasChanges] = useState(false);
    const [profile, setProfile] = useState({
        name: user.name,
        email: null,
        image: null,
        bio: user.bio,
        gender: user.gender,
    });

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCate = async () => {
            await axiosClient.get(`/categories`).then(({ data }) => {
                setCategories(data.categories);
            });
        };

        getCate();
    }, []);

    const handleCategoryChange = (categoryId) => {
        setHasChanges(true);
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(
                selectedCategories.filter((id) => id !== categoryId)
            );
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const handleSubmit = async (e) => {
        console.log("submitting");
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", profile.name);
        if (profile.email) {
            formData.append("email", profile.email);
        }
        if (profile.image) {
            formData.append("image", profile.image);
        }
        formData.append("bio", profile.bio);
        formData.append("gender", profile.gender);

        if (selectedCategories.length > 0) {
            const categoryIds = selectedCategories.map(Number);
            formData.append("categories", JSON.stringify(categoryIds));
        }

        onUpdate(formData);
    };

    return (
        <div className="update-profile-modal">
            <div className="modal-header">
                <h2 className="modal-title">Update Profile</h2>
                <button
                    className="btn-close"
                    onClick={closeModal}
                    aria-label="Close"
                ></button>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div
                        className="mb-1 d-flex align-items-center"
                        style={{
                            flexDirection: "column",
                        }}
                    >
                        <div>
                            {profile.image ? (
                                <img
                                    src={URL.createObjectURL(profile.image)}
                                    alt=""
                                    style={{
                                        width: 200,
                                        height: 200,
                                        borderRadius: 200,
                                    }}
                                    className="my-2"
                                />
                            ) : (
                                <img
                                    src={
                                        `${
                                            import.meta.env.VITE_BASE_URL
                                        }/api/images/` + user.image
                                    }
                                    className="my-2"
                                    alt=""
                                    style={{
                                        width: 200,
                                        height: 200,
                                        borderRadius: 200,
                                    }}
                                />
                            )}
                        </div>
                        <div
                            style={{
                                borderRadius: 5,
                                backgroundColor: "green",
                                width: "fit-content",
                                textAlign: "center",
                                padding: 5,
                            }}
                        >
                            <label htmlFor="image" className="form-label">
                                Choose An Image
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                accept="image/*"
                                onChange={(e) => {
                                    setProfile({
                                        ...profile,
                                        image: e.target.files[0],
                                    });
                                    setHasChanges(true);
                                }}
                                hidden
                            />
                        </div>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="name" className="form-label">
                            Name:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={profile.name}
                            onChange={(e) => {
                                setProfile({
                                    ...profile,
                                    name: e.target.value,
                                });
                                setHasChanges(true);
                            }}
                            required
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="email" className="form-label">
                            Email:
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            defaultValue={user.email}
                            onChange={(e) => {
                                setProfile({
                                    ...profile,
                                    email: e.target.value,
                                });
                                setHasChanges(true);
                            }}
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="bio" className="form-label">
                            Bio:
                        </label>
                        <textarea
                            className="form-control"
                            id="bio"
                            value={profile.bio}
                            onChange={(e) => {
                                setProfile({ ...profile, bio: e.target.value });
                                setHasChanges(true);
                            }}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="gender" className="form-label">
                            Gender:
                        </label>
                        <select
                            className="form-control"
                            id="gender"
                            value={profile.gender}
                            onChange={(e) => {
                                setProfile({
                                    ...profile,
                                    gender: e.target.value,
                                });
                                setHasChanges(true);
                            }}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className="d-flex flex-column">
                        <label>Select Categories:</label>
                        {categories.map((category) => (
                            <label key={category.id}>
                                <input
                                    type="checkbox"
                                    value={category.id}
                                    checked={selectedCategories.includes(
                                        category.id
                                    )}
                                    onChange={
                                        () => handleCategoryChange(category.id)
                                        // console.log(category.id)
                                    }
                                />
                                {category.cate_name}
                            </label>
                        ))}
                    </div>

                    <div
                        className="d-flex"
                        style={{
                            justifyContent: "center",
                            margin: 10,
                        }}
                    >
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!hasChanges}
                        >
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileModal;
