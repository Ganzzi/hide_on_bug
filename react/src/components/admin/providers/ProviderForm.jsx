import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../utils/axios.js";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";

export default function ProviderForm() {
    const navigate = useNavigate();
    const [provider, setProvider] = useState({
        name: "",
        logo: null,
    });

    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setAlerts } = useStateContext();
    const [selectedImage, setSelectedImage] = useState();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setSelectedImage(file);
    };

    const onSubmit = async (ev) => {
        ev.preventDefault();

        const formdata = new FormData();
        formdata.append("service_name", provider.name);
        if (provider.logo) {
            formdata.append("logo", provider.logo);
        }

        try {
            setLoading(true);
            const response = await axiosClient.post("/admin/providers", formdata);

            if (response.status === 201) {
                setAlerts({
                    type: "info",
                    message: "Provider was successfully added",
                    time: new Date(),
                });
                navigate("/admin/providers");
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column">
            <h1>New provider</h1>
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
                            value={provider.name}
                            onChange={(ev) =>
                                setProvider({
                                    ...provider,
                                    name: ev.target.value,
                                })
                            }
                            placeholder="Name"
                        />
                        {selectedImage && (
                            <img
                                src={selectedImage.preview}
                                alt=""
                                width={80}
                                height={80}
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChangeCapture={handleImageChange}
                            onChange={(ev) =>
                                setProvider({
                                    ...provider,
                                    logo: ev.target.files[0],
                                })
                            }
                        />
                        <button
                            type="submit" // Thêm type="submit" vào nút Save
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
