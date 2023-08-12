import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axiosClient from "../../../utils/axios.js";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";

export default function FilmForm() {
    const navigate = useNavigate();
    const { filmId } = useParams();
    const [categories, setCategories] = useState([]);
    const [film, setFilm] = useState({
        id: null,
        film_name: "",
        film_poster: null,
        video: null,
        premiere_date: null,
    });
    const location = useLocation();
    const [providerId, setProviderId] = useState(null);
    const [service_name, setService_name] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        setProviderId(location.state?.providerId);
        setService_name(location.state.service_name);

        const getCate = async () => {
            await axiosClient.get(`/admin/categories`).then(({ data }) => {
                setCategories(data.categories);
            });
        };

        getCate();
    }, []);

    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setAlerts } = useStateContext();
    const [selectedImage, setSlectedImage] = useState();

    const handleCategoryChange = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(
                selectedCategories.filter((id) => id !== categoryId)
            );
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

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

        const formdata = new FormData();

        const categoryIds = selectedCategories.map(Number);

        formdata.append("stream_service_provider_id", providerId);
        formdata.append("film_name", film.film_name);
        formdata.append("film_poster", film.film_poster);
        formdata.append("video", film.video);
        formdata.append("premiere_date", film.premiere_date);
        formdata.append("categories", JSON.stringify(categoryIds));

        if (filmId) {
            await axiosClient
                .post(`/admin/film_update/${filmId}`, formdata)
                .then(() => {
                    setAlerts({
                        type: "info",
                        message: "provider was successfully updated",
                        time: new Date(),
                    });
                    navigate("/admin/providers/" + providerId + "/films");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            await axiosClient
                .post("/admin/films", formdata)
                .then(() => {
                    setAlerts({
                        type: "info",
                        message: "provider was successfully updated",
                        time: new Date(),
                    });
                    navigate(`/admin/providers/${providerId}`);
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
        <div className="d-flex flex-column align-items-center justify-content-center m-5">
            {filmId && (
                <i>    <h3>
                    Update film {film.name} of provider  <i className="text-danger">{service_name}</i>
                </h3></i>
            )}
            {!filmId && <i><h3>Add New film for provider <i className="text-danger">{service_name}</i></h3></i>}
            <div className="card animated fadeInDown   ">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit} className="m-5">
                        <label htmlFor="name">Name:</label>
                        <input

                            value={film.film_name}
                            onChange={(ev) =>
                                setFilm({
                                    ...film,
                                    film_name: ev.target.value,
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
                        <label htmlFor="image">Image:</label>
                        <input
                            type="file"
                            placeholder="Image"
                            onChangeCapture={handleImageChange}
                            onChange={(ev) =>
                                setFilm({
                                    ...film,
                                    film_poster: ev.target.files[0],
                                })
                            }
                        />

                        <div>
                            <label htmlFor="video">Video File:</label>
                            <input
                                placeholder="video"
                                type="file"
                                id="video"
                                accept="video/*"
                                onChange={(ev) =>
                                    setFilm({
                                        ...film,
                                        video: ev.target.files[0],
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="premiereDate">Premiere Date:</label>
                            <input
                                type="date"
                                id="premiereDate"
                                value={film.premiere_date}
                                onChange={(ev) =>
                                    setFilm({
                                        ...film,
                                        premiere_date: ev.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label>Select Categories:</label>
                            {categories.map((category) => (
                                <label key={category.id} style={{marginLeft:"30px",marginTop:"20px"}} >
                                    <input   
                                        type="checkbox"
                                        value={category.id}
                                        checked={selectedCategories.includes(
                                            category.id
                                        )}
                                        onChange={
                                            () =>
                                                handleCategoryChange(
                                                    category.id
                                                )
                                            // console.log(category.id)
                                        }
                                    />
                                    {category.cate_name}
                                </label>
                            ))}
                        </div>
                        {/* <div>
                            <label>Select Categories:</label>
                            <select multiple onChange={handleCategoryChange}>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.cate_name}
                                    </option>
                                ))}
                            </select>
                        </div> */}

                        <button
                            className="btn btn-outline-dark "
                            style={{ width: "100px",marginLeft:"40%",marginTop:"5%",paddingLeft:"2%",paddingRight:"2%" }}
                        >
                            Save
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
