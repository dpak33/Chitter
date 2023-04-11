import React, { useState, useEffect } from "react";
import axios from "axios";

const PeepForm = ({ username }) => {
    const [peepData, setPeepData] = useState({
        description: "",
        username: username,
    });

    // Update the username in peepData when the `username` prop changes
    useEffect(() => {
        setPeepData((prevState) => {
            return { ...prevState, username: username };
        });
    }, [username]);

    const handlePeepChange = (event) => {
        setPeepData({
            ...peepData,
            [event.target.name]: event.target.value,
        });
    };

    const handlePeepSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/api/peep", peepData);
            setPeepData({
                description: "",
                username: username,
            });
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <form onSubmit={handlePeepSubmit}>
            <label htmlFor="peep">Peep</label>
            <input
                type="text"
                id="peep"
                name="description"
                value={peepData.description}
                onChange={handlePeepChange}
                placeholder="What's happening?"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default PeepForm;