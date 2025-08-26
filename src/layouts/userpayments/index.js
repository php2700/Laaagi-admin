// layouts/user-payment-history/index.js

// @mui material components
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// React hooks and router
import { useEffect, useState } from "react";
// --- बदलाव 1: useLocation को useParams से बदलें ---
import {useLocation, useNavigate, useParams } from "react-router-dom"; 
import axios from "axios";

// Common functions
import { logout } from "layouts/common";
import { useMaterialUIController } from "context";

function UserPaymentHistory() {
    const navigate = useNavigate();
    // --- बदलाव 2: useParams का उपयोग करके URL से userId निकालें ---
    const { userId } = useParams(); 
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    // State declarations
    const [userHistory, setUserHistory] = useState([]);
    const [userName, setUserName] = useState(""); 
    
    // --- बदलाव 3: location.state की अब कोई ज़रूरत नहीं है ---
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        // अब हम userId को सीधे useParams से ले रहे हैं, जो URL में मौजूद है
        if (!userId) {
            console.error("userid not found in URL");
            navigate("/users"); 
            return;
        }

        if (!token) {
            logout(navigate);
            return;
        }

        const fetchUserHistory = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}api/admin/payment-history/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const historyData = response.data.data || [];
                
                if (historyData.length > 0 && historyData[0].userId) {
                    setUserName(historyData[0].userId.name);
                }
                
                const modifiedData = historyData.map((payment) => ({
                    _id: payment._id,
                    amount: `₹${payment.amount}`,
                    invitationName: payment.invitationName,
                    orderId: payment.razorpay_order_id,
                    date: new Date(payment.createdAt).toLocaleDateString("hi-IN"),
                }));
                
                setUserHistory(modifiedData);

            } catch (error) {
                if (error?.response?.status === 401) logout(navigate);
                console.error("error of bring userpayment history:", error);
                setUserHistory([]);
            }
        };

        fetchUserHistory();
    }, [userId, navigate, token]); // useEffect की dependencies

    const columns = [
        { Header: "ID", accessor: "serialNo", width: "5%", align: "left" },
        { Header: "Amount", accessor: "amount", width: "15%", align: "left" },
        { Header: "Invitation Name", accessor: "invitationName", width: "30%", align: "left" },
        { Header: "Order ID", accessor: "orderId", width: "25%", align: "left" },
        { Header: "Date", accessor: "date", width: "15%", align: "left" },
    ];

    const rows = userHistory.map((payment, index) => ({
        serialNo: (
            <MDTypography component="p" variant="caption" color="text">{index + 1}</MDTypography>
        ),
        amount: (
            <MDTypography component="p" variant="caption" color="text">{payment.amount}</MDTypography>
        ),
        invitationName: (
            <MDTypography component="p" variant="caption" color="text">{payment.invitationName}</MDTypography>
        ),
        orderId: (
            <MDTypography component="p" variant="caption" color="text">{payment.orderId}</MDTypography>
        ),
        date: (
            <MDTypography component="p" variant="caption" color="text">{payment.date}</MDTypography>
        ),
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
                        {/* <MDTypography variant="h6" color="white">
                            {userName ? `Payment History for: ${userName}` : ""}
                        </MDTypography> */}
                         <MDTypography variant="h6" color="white">
                            Payment History for: {userName || ""}
                        </MDTypography>
                        

                    </MDBox>
                    <MDBox pt={3}>
                        {userHistory.length === 0 ? (
                            <MDTypography sx={{ textAlign: "center", p: 3 }}>
                                No Payment History Found for this User.
                            </MDTypography>
                        ) : (
                            <DataTable
                                table={{ columns, rows }}
                                isSorted={false}
                                entriesPerPage={false}
                                showTotalEntries={false}
                                noEndBorder
                            />
                        )}
                    </MDBox>
                </Card>
            </MDBox>
        </DashboardLayout>
    );
}

export default UserPaymentHistory;