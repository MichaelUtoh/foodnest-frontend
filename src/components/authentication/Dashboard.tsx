import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../dashboard/sidebar";

import axios from "axios";
import { REACT_APP_BACKEND_API_BASE_URL } from '../../../config'
import NavBar from "../navigation/NavBar";
import useSidebarStore from "../../../store/sidebarStore";
import DashboardMain from "../dashboard/main";
import useUserStore from "../../../store/userStore";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    const { selected } = useSidebarStore()
    const setUserDetails = useUserStore((state) => state.setUserDetails);

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
                {true && <DashboardMain />}

            </div>
        </div >
    );
};

export default Dashboard;
