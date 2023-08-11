import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axiosClient from "../../../utils/axios.js";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";

export default function ProviderForm() {
    const navigate = useNavigate();
    let { providerId } = useParams();
    const [provider, setProvider] = useState({
        id: null,
        service_name: "",
        logo: null,
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
                        setProvider(data[0]);
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

        // if (providerId) {
        //     await axiosClient
        //         .put(`/admin/providers/${providerId}`, provider)
        //         .then(() => {
        //             setAlerts({
        //                 type: "info",
        //                 message: "provider was successfully updated",
        //                 time: new Date(),
        //             });
        //             navigate("/admin/providers");
        //         })
        //         .catch((err) => {
        //             const response = err.response;
        //             if (response && response.status === 422) {
        //                 setErrors(response.data.errors);
        //             }
        //         });
        // } else {
        //     const formdata = new FormData();
        //     formdata.append("service_name", provider.service_name);
        //     formdata.append("role_id", provider.role_id);
        //     formdata.append("logo", provider.logo);
        //     formdata.append("email", provider.email);
        //     formdata.append("password", provider.password);
        //     formdata.append(
        //         "password_confirmation",
        //         provider.password_confirmation
        //     );

        //     await axiosClient
        //         .post("/admin/providers", formdata)
        //         .then(() => {
        //             setAlerts({
        //                 type: "info",
        //                 message: "provider was successfully updated",
        //                 time: new Date(),
        //             });
        //             navigate("/admin/providers");
        //         })
        //         .catch((err) => {
        //             const response = err.response;
        //             if (response && response.status === 422) {
        //                 setErrors(response.data.errors);
        //             }
        //         });
        // }
    };

    console.log(provider);

    return (
        <div className="d-flex flex-column">
            {provider.id && <h1>Update provider: {provider.service_name}</h1>}
            {!provider.id && <h1>New provider</h1>}
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
                            value={provider.service_name}
                            onChange={(ev) =>
                                setProvider({
                                    ...provider,
                                    service_name: ev.target.value,
                                })
                            }
                            placeholder="Service Name"
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
                                    logo: ev.target.files[0],
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
