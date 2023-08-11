import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axiosClient from "../../../utils/axios.js";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";

export default function ProviderForm() {
    const navigate = useNavigate();
    let { providerId } = useParams();
    const [provider, setProvider] = useState({
        id: null,
        provider_name: "",
        provider_logo: null,
    });

    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setAlerts } = useStateContext();
    const [selectedImage, setSlectedImage] = useState();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setSlectedImage(file);
    };

    if (providerId) {
        useEffect(() => {
            setLoading(true);
            const getProviderData = async () => {
                await axiosClient
                    .get(`/admin/providers/${providerId}`)
                    .then(({ data }) => {
                        setLoading(false);
                        setProvider(data);
                    })
                    .catch(() => {
                        setLoading(false);
                    });
            };

            getProviderData();
        }, []);
    }

    const onSubmit = async (ev) => {
        ev.preventDefault();

        if (providerId) {
            const formdata = new FormData();
            formdata.append("provider_name", provider.provider_name);
            formdata.append("provider_logo", provider.provider_logo);

            await axiosClient
                .post(`/admin/provider_update/${providerId}`, formdata)
                .then(() => {
                    setAlerts({
                        type: "info",
                        message: "provider was successfully updated",
                        time: new Date(),
                    });
                    navigate("/admin/providers");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            const formdata = new FormData();
            formdata.append("provider_name", provider.provider_name);
            formdata.append("provider_logo", provider.provider_logo);

            await axiosClient
                .post("/admin/providers", formdata)
                .then(() => {
                    setAlerts({
                        type: "info",
                        message: "provider was successfully updated",
                        time: new Date(),
                    });
                    navigate("/admin/providers");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <div className="d-flex flex-column">
            {providerId && <h1>Update provider: {provider.provider_name}</h1>}
            {!providerId && <h1>New provider</h1>}
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
                            value={provider.provider_name}
                            onChange={(ev) =>
                                setProvider({
                                    ...provider,
                                    provider_name: ev.target.value,
                                })
                            }
                            placeholder="Provider Name"
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
                            onChangeCapture={handleImageChange}
                            onChange={(ev) =>
                                setProvider({
                                    ...provider,
                                    provider_logo: ev.target.files[0],
                                })
                            }
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
