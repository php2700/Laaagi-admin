// layouts/user-guest-list/index.js

// @mui and other imports...
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { logout } from "layouts/common";
import { useMaterialUIController } from "context";

function UserGuestList() {
    const navigate = useNavigate();
    const { userId } = useParams(); // URL से userId पकड़ें
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    // State declarations
    const [userGuests, setUserGuests] = useState([]);
    const [userName, setUserName] = useState("");
    
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        if (!userId) {
            navigate("/users");
            return;
        }
        if (!token) {
            logout(navigate);
            return;
        }

        const fetchUserGuests = async () => {
            try {
                // हमारी नई गेस्ट API को कॉल करें
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}api/admin/all-guests/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const guestData = response.data.data || [];
                
                if (guestData.length > 0 && guestData[0].userId) {
                    setUserName(guestData[0].userId.name);
                }
                
                // गेस्ट स्कीमा के अनुसार डेटा को मैप करें
                const modifiedData = guestData.map((guest) => ({
                    _id: guest._id,
                    name: guest.name || "N/A",
                    mobile: guest.mobile || "N/A",
                    address: guest.address || "N/A",
                    category: guest.category || "N/A",
                }));
                
                setUserGuests(modifiedData);

            } catch (error) {
                if (error?.response?.status === 401) logout(navigate);
                console.error("यूज़र के गेस्ट्स लाने में त्रुटि:", error);
                setUserGuests([]);
            }
        };

        fetchUserGuests();
    }, [userId, navigate, token]);

    // DataTable के लिए कॉलम
    const columns = [
        { Header: "ID", accessor: "serialNo", width: "5%", align: "left" },
        { Header: "Name", accessor: "name", width: "25%", align: "left" },
        { Header: "Mobile", accessor: "mobile", width: "20%", align: "left" },
        { Header: "Address", accessor: "address", width: "30%", align: "left" },
        { Header: "Category", accessor: "category", width: "15%", align: "left" },
    ];

    // DataTable के लिए पंक्तियाँ (rows)
    const rows = userGuests.map((guest, index) => ({
        serialNo: <MDTypography variant="caption" color="text">{index + 1}</MDTypography>,
        name: <MDTypography variant="caption" color="text">{guest.name}</MDTypography>,
        mobile: <MDTypography variant="caption" color="text">{guest.mobile}</MDTypography>,
        address: <MDTypography variant="caption" color="text">{guest.address}</MDTypography>,
        category: <MDTypography variant="caption" color="text">{guest.category}</MDTypography>,
    }));

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Card>
                    <MDBox
                        mx={2} mt={-3} py={3} px={2}
                        variant="gradient" bgColor={sidenavColor} borderRadius="lg" coloredShadow="info"
                        display="flex" justifyContent="space-between" alignItems="center"
                    >
                        <MDTypography variant="h6" color="white">
                            Guest List for: {userName || ""}
                        </MDTypography>

                    </MDBox>
                    <MDBox pt={3}>
                        {userGuests.length === 0 ? (
                            <MDTypography sx={{ textAlign: "center", p: 3 }}>
                                No Guests Found for this User.
                            </MDTypography>
                        ) : (
                            <DataTable
                                table={{ columns, rows }}
                                noEndBorder
                            />
                        )}
                    </MDBox>
                </Card>
            </MDBox>
        </DashboardLayout>
    );
}

export default UserGuestList;