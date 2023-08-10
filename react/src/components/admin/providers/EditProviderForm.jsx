import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../utils/axios.js";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";

export function EditProviderForm({ provider, onCancelEdit, onUpdateProvider }) {
    const [editedProvider, setEditedProvider] = useState({ ...provider });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedProvider((prevProvider) => ({
            ...prevProvider,
            [name]: value,
        }));
    };

    const onSaveClick = async () => {
        try {
            setLoading(true);

            const response = await axiosClient.put(
                `/admin/providers/${editedProvider.id}`,
                editedProvider
            );

            onUpdateProvider(response.data);
        } catch (error) {
            console.error("Error updating provider:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Edit Provider</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <form>
                    <div>
                        <label htmlFor="service_name">Service Name</label>
                        <input
                            type="text"
                            id="service_name"
                            name="service_name"
                            value={editedProvider.service_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    {/* Add other input fields for editing */}
                    <button type="button" onClick={onSaveClick}>
                        Save
                    </button>
                    <button type="button" onClick={onCancelEdit}>
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
}
