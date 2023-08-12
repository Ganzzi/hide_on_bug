import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axiosClient from "../../../utils/axios.js";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import React from "react";

export default function UserForm ()
{
    const navigate = useNavigate();
    let { userId } = useParams();
    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        role_id: null,
        image: null,
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setAlerts } = useStateContext();
    const [selectedImage, setSlectedImage] = useState();
    const handleImageChange = (e) =>
    {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setSlectedImage(file);
    };

    if (userId)
    {
        useEffect(() =>
        {
            setLoading(true);
            const getUserData = async () =>
            {
                await axiosClient
                    .get(`/admin/users/${userId}`)
                    .then(({ data }) =>
                    {
                        setLoading(false);
                        const tempData = { ...data };
                        setUser(tempData);
                    })
                    .catch(() =>
                    {
                        setLoading(false);
                    });
            };

            getUserData();
        }, []);
    }

    const onSubmit = async (ev) =>
    {
        ev.preventDefault();
        if (userId)
        {
            await axiosClient
                .put(`/admin/users/${userId}`, user)
                .then(() =>
                {
                    setAlerts({
                        type: "info",
                        message: "user was successfully updated",
                        time: new Date(),
                    });
                    navigate("/admin/users");
                })
                .catch((err) =>
                {
                    const response = err.response;
                    if (response && response.status === 422)
                    {
                        setErrors(response.data.errors);
                    }
                });
        } else
        {
            const formdata = new FormData();
            formdata.append("name", user.name);
            formdata.append("role_id", user.role_id);
            formdata.append("image", user.image);
            formdata.append("email", user.email);
            formdata.append("password", user.password);
            formdata.append(
                "password_confirmation",
                user.password_confirmation
            );

            await axiosClient
                .post("/admin/users", formdata)
                .then(() =>
                {
                    setAlerts({
                        type: "info",
                        message: "user was successfully updated",
                        time: new Date(),
                    });
                    navigate("/admin/users");
                })
                .catch((err) =>
                {
                    const response = err.response;
                    if (response && response.status === 422)
                    {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <div className="d-flex flex-column">
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            value={user.name}
                            onChange={(ev) =>
                                setUser({ ...user, name: ev.target.value })
                            }
                            placeholder="Name"
                        />
                        <input
                            value={user.email}
                            onChange={(ev) =>
                                setUser({ ...user, email: ev.target.value })
                            }
                            placeholder="Email"
                        />
                        <input
                            value={user.role_id}
                            type="number"
                            min={1}
                            max={2}
                            onChange={(ev) =>
                                setUser({ ...user, role_id: ev.target.value })
                            }
                            placeholder="Role id"
                        />
                        {selectedImage && (
                            <img
                                src={selectedImage.preview}
                                alt=""
                                width={80}
                                height={80}
                            />
                        )}
                        {!userId && (
                            <input
                                type="file"
                                onChangeCapture={handleImageChange}
                                onChange={(ev) =>
                                    setUser({
                                        ...user,
                                        image: ev.target.files[0],
                                    })
                                }
                            />
                        )}
                        <input
                            type="password"
                            onChange={(ev) =>
                                setUser({ ...user, password: ev.target.value })
                            }
                            placeholder="Password"
                        />
                        <input
                            type="password"
                            onChange={(ev) =>
                                setUser({
                                    ...user,
                                    password_confirmation: ev.target.value,
                                })
                            }
                            placeholder="Password Confirmation"
                        />

                        <button
                            className="btn btn-outline-success"
                            style={{ width: "100px" }}
                        >
                            Save
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
