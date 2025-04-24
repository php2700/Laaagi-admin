/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";
import axios from "axios";


export default function data() {
    const [bannerData, setBannerData] = useState([]);
    const token = localStorage.getItem("authToken");

    const getBannerData = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}api/admin/banner_list`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setBannerData(response.data);
        } catch (error) {
            console.error("Error fetching banner data:", error);
        }
    };

    useEffect(() => {
        getBannerData();
    }, []);

    return {
        columns: [
            { Header: "id", accessor: "id", align: "center" },
            { Header: "file", accessor: "file", align: "center" },
            { Header: "action", accessor: "action", align: "center" },
        ],

        rows: [
            {
                id: (
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                        1
                    </MDTypography>
                ),
                file: (
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                        file
                    </MDTypography>
                ),
                action: (
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                        Delete
                    </MDTypography>
                ),
            },
        ],
    };
}
