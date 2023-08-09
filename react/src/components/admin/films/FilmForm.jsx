import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axiosClient from "../../../utils/axios.js";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";

export default function FilmForm() {
    const navigate = useNavigate();
    let { providerId, filmId } = useParams();
    const [film, setFilm] = useState({
        id: null,
        name: "",
        image: null,
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

    // if (filmId) {
    //     useEffect(() => {
    //         setLoading(true);
    //         const getProviderData = async () => {
    //             await axiosClient
    //                 .get(`/admin/films/${id}`)
    //                 .then(({ data }) => {
    //                     setLoading(false);
    //                     setFilm(data);
    //                 })
    //                 .catch(() => {
    //                     setLoading(false);
    //                 });
    //         };

    //         getProviderData();
    //     }, []);
    // }

    const onSubmit = async (ev) => {
        ev.preventDefault();

        // if (filmId) {
        //     await axiosClient
        //         .put(`/admin/films/${filmId}`, film)
        //         .then(() => {
        //             setAlerts({
        //                 type: "info",
        //                 message: "provider was successfully updated",
        //                 time: new Date(),
        //             });
        //             navigate("/admin/films");
        //         })
        //         .catch((err) => {
        //             const response = err.response;
        //             if (response && response.status === 422) {
        //                 setErrors(response.data.errors);
        //             }
        //         });
        // } else {
        //     const formdata = new FormData();
        //     formdata.append("name", film.name);
        //     formdata.append("role_id", film.role_id);
        //     formdata.append("image", film.image);
        //     formdata.append("email", film.email);
        //     formdata.append("password", film.password);
        //     formdata.append(
        //         "password_confirmation",
        //         film.password_confirmation
        //     );

        //     await axiosClient
        //         .post("/admin/films", formdata)
        //         .then(() => {
        //             setAlerts({
        //                 type: "info",
        //                 message: "provider was successfully updated",
        //                 time: new Date(),
        //             });
        //             navigate("/admin/films");
        //         })
        //         .catch((err) => {
        //             const response = err.response;
        //             if (response && response.status === 422) {
        //                 setErrors(response.data.errors);
        //             }
        //         });
        // }
    };

    return (
        <div className="d-flex flex-column">
            {film.id && <h1>Update film: {film.name}</h1>}
            {!film.id && <h1>New film</h1>}
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
                            value={film.name}
                            onChange={(ev) =>
                                setFilm({
                                    ...film,
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
                            onChangeCapture={handleImageChange}
                            onChange={(ev) =>
                                setFilm({
                                    ...film,
                                    image: ev.target.files[0],
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
