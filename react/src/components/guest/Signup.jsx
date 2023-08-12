import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../utils/axios";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import { HiOutlinePhotograph } from "react-icons/Hi";

export default function Signup() {
    const { setUser, setToken } = useStateContext();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
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
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(
                selectedCategories.filter((id) => id !== categoryId)
            );
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", nameRef.current.value);
        formData.append("email", emailRef.current.value);
        formData.append("password", passwordRef.current.value);
        formData.append(
            "password_confirmation",
            passwordConfirmationRef.current.value
        );

        if (selectedCategories.length > 0) {
            const categoryIds = selectedCategories.map(Number);
            formData.append("categories", JSON.stringify(categoryIds));
        }

        await axiosClient
            .post("/signup", formData)
            .then(({ data }) => {
                setToken(data.token);
                setUser(data.user);
            })
            .catch((err) => {
                const response = err.response;

                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setError(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <h1 className="title">Sign Up for free</h1>
                    {error && (
                        <div className="alert">
                            {Object.keys(error).map((key) => (
                                <p key={key}>{error[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input ref={nameRef} type="text" placeholder="Full Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <input
                        type="file"
                        id="file-signup"
                        onChange={(ev) => setImage(ev.target.files[0])}
                        placeholder="image"
                    />
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
                    <button className="btn btn-block btn-primary" type="submit">
                        Signup
                    </button>
                    <p className="message">
                        Already Register?
                        <Link to={"/login"}>Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
