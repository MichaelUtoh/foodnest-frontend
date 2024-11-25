import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../dashboard/sidebar";

import axios from "axios";
import { REACT_APP_BACKEND_API_BASE_URL } from '../../../config'
import NavBar from "../dashboard/NavBar";
import DashboardMain from "../dashboard/main";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    const [userDetails, setUserDetails] = useState<any>(null);

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
            return;
        }

        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${REACT_APP_BACKEND_API_BASE_URL}/api/v1/auth/user/${userId}/`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                setUserDetails(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
                if (error.response?.status === 401) {
                    navigate("/login");
                }
            }
        };

        fetchUserDetails();
    }, [authToken, navigate, userId]);

    if (!authToken) {
        navigate("/login");
        return null;
    }

    return (
        <div>
            <NavBar />
            <div className="flex">
                <Sidebar />


                {userDetails ? (
                    <DashboardMain userDetails={userDetails} />
                ) : (
                    <p>Loading user details...</p>
                )}
            </div>
        </div >
    );
};

export default Dashboard;
