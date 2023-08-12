import React, { useState } from "react";
import axiosClient from "../../../utils/axios";

const AddWatchListModal = ({ onSuccess, onClose }) => {
    const [watch_list_name, setWatchListName] = useState("");
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosClient
                .post("watchlists", {
                    watch_list_name,
                })
                .then(() => {
                    onSuccess();
                    onClose();
                });

            if (response.status === 201) {
                setMessage(response.data.message);
                setWatchListName("");
                setErrors({});
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setMessage("Something went wrong");
            }
        }
    };

    return (
        <div>
            <div className="">
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <p>Watch List Name:</p>
                        <input
                            type="text"
                            value={watch_list_name}
                            onChange={(e) => setWatchListName(e.target.value)}
                        />
                        {errors.watch_list_name && (
                            <p className="error">{errors.watch_list_name[0]}</p>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddWatchListModal;
