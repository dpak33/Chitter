import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";
import PeepForm from '../components/PeepForm';
import PeepDisplay from '../components/PeepDisplay';


const Home = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [peeps, setPeeps] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        toast.loading()
        try {
            const token = localStorage.getItem('user');
            const response = await axios.get('/api/user/get-user-info', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.dismiss()
            if (response.data.success) {
                setUserInfo(response.data.data);
            } else {
                localStorage.removeItem('user');
                navigate('/login')
                toast.error('Something went wrong!')
            }
        } catch (error) {
            localStorage.removeItem('user');
            navigate('/login')
            toast.error('Something went wrong!')
        }
    };

    useEffect(() => {
        if (userInfo == null) {
            getData();
        }
    }, [userInfo]);

    useEffect(() => {
        const fetchPeeps = async () => {
            try {
                const response = await axios.get('/api/peep');
                setPeeps(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPeeps();
    }, []);

    const handlePeepSubmit = async (peep) => {
        try {
            peep.username = userInfo.username;
            const response = await axios.post('/api/peep', peep);
            setPeeps([...peeps, response.data]);

        } catch (error) {
            console.log(error);
        }
    };

    const logoutUser = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        userInfo !== null && (
            <div className="App">
                <div className="flex justify-between items-center">
                    hello {userInfo?.username}
                    <button onClick={logoutUser}>Logout</button>
                </div>
                <PeepForm username={userInfo.username} handlePeepSubmit={handlePeepSubmit} />
                <PeepDisplay peeps={peeps} />
            </div>
        )
    );
};

export default Home;