// // PaymentHistoryAdmin.js

// // @mui material components
// import Grid from "@mui/material/Grid";
// import { Card } from "@mui/material";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
// import MDPagination from "components/MDPagination";

// // Material Dashboard 2 React examples
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";

// // React hooks and router
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// // Context and common functions
// import { useMaterialUIController } from "context";
// import { logout } from "layouts/common";

// // Icons
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

// function PaymentHistoryAdmin() {
//     const navigate = useNavigate();
//     const [controller] = useMaterialUIController();
//     const { sidenavColor } = controller;

//     // State declarations
//     const [paymentHistory, setPaymentHistory] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [search, setSearch] = useState("");

//     // Pagination states
//     const [totalPages, setTotalPages] = useState(0);
//     const [perPage, setPerPage] = useState(10);

//     const token = localStorage.getItem("authToken");

//     // पेमेंट हिस्ट्री डेटा लाने के लिए फंक्शन
//     const getPaymentHistory = async (page, searchQuery) => {
//         if (!token) {
//             logout(navigate);
//             return;
//         }

//         try {
//             const response = await axios.get(`${process.env.REACT_APP_BASE_URL}api/admin/payment-history`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 },
//                 params: {
//                     q: searchQuery,
//                     page: page,
//                     per_page: perPage,
//                     modelType: "payment"
//                 }
//             });
//             console.log("API Response:", response.data);
//             const historyData = response.data.data || [];

//             if (response.data.pagination) {
//                 setTotalPages(response.data.pagination.totalPages || 0);
//                 setCurrentPage(response.data.pagination.currentPage || 1);
//                 console.log("Pagination Data:", response.data.pagination);

//             } else {
//                 setTotalPages(Math.ceil(historyData.length / perPage));
//                 console.log("No pagination object, calculated totalPages:", Math.ceil(historyData.length / perPage));
//             }

//             const modifiedData = historyData.map((payment) => ({
//                 _id: payment._id,
//                 userName: payment.userId?.name || "N/A",
//                 amount: `₹${payment.amount}` || "N/A",
//                 invitationName: payment.invitationName || "N/A",
//                 orderId: payment.razorpay_order_id || "N/A",
//                 // सुनिश्चित करें कि createdAt उपलब्ध है और Date ऑब्जेक्ट में परिवर्तित हो सके
//                 date: new Date(payment.createdAt).toLocaleDateString("hi-IN"),
//                 createdAtRaw: new Date(payment.createdAt) // सॉर्टिंग के लिए कच्ची तारीख रखें
//             }));

//             // नवीनतम डेटा को पहले दिखाने के लिए सॉर्ट करें (createdAt के आधार पर)
//             modifiedData.sort((a, b) => b.createdAtRaw - a.createdAtRaw);

//             setPaymentHistory(modifiedData);
//         } catch (error) {
//             if (error?.response?.status === 401) {
//                 logout(navigate);
//             }
//             console.error("error bring to payment history:", error);
//             setPaymentHistory([]);
//         }
//     };

//     const handlePageChange = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//         }
//     };

//     useEffect(() => {
//         getPaymentHistory(currentPage, search);
//     }, [currentPage, search]);

//     const columns = [
//         { Header: "ID", accessor: "serialNo", width: "1%", align: "left" },
//         { Header: "User Name", accessor: "userName", width: "20%", align: "left" },
//         { Header: "Amount", accessor: "amount", width: "10%", align: "left" },
//         { Header: "Invitation Name", accessor: "invitationName", width: "25%", align: "left" },
//         { Header: "Order ID", accessor: "orderId", width: "20%", align: "left" },
//         { Header: "Date", accessor: "date", width: "10%", align: "left" },
//     ];

//     const rows = paymentHistory.map((payment, index) => ({
//         serialNo: (
//             <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
//                 {(currentPage - 1) * perPage + index + 1}
//             </MDTypography>
//         ),
//         userName: (
//             <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
//                 {payment.userName}
//             </MDTypography>
//         ),
//         amount: (
//             <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
//                 {payment.amount}
//             </MDTypography>
//         ),
//         invitationName: (
//             <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
//                 {payment.invitationName}
//             </MDTypography>
//         ),
//         orderId: (
//             <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
//                 {payment.orderId}
//             </MDTypography>
//         ),
//         date: (
//             <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
//                 {payment.date}
//             </MDTypography>
//         ),
//     }));

//     return (
//         <DashboardLayout>
//             <DashboardNavbar />
//             <MDBox pt={6} pb={3}>
//                 <Grid container spacing={6}>
//                     <Grid item xs={12}>
//                         <Card>
//                             <MDBox
//                                 mx={2} mt={-3} py={3} px={2}
//                                 variant="gradient" bgColor={sidenavColor} borderRadius="lg" coloredShadow="info"
//                             >
//                                 <MDTypography variant="h6" color="white">
//                                     Payment History
//                                 </MDTypography>
//                             </MDBox>
//                             <MDBox pt={3}>
//                                 {/* सर्च इनपुट यहाँ जोड़ सकते हैं, अगर API में सपोर्ट हो */}
//                                 {paymentHistory.length === 0 ? (
//                                     <MDTypography sx={{ textAlign: "center", fontWeight: "500", padding: "20px" }}>
//                                         No Payment History Found
//                                     </MDTypography>
//                                 ) : (
//                                     <>
//                                         <DataTable
//                                             table={{ columns, rows }}
//                                             isSorted={false}
//                                             entriesPerPage={false}
//                                             showTotalEntries={false}
//                                             noEndBorder
//                                         />
//                                         {totalPages > 1 && (
//                                             <MDBox display="flex" justifyContent="center" p={2}>
//                                                 <MDPagination>
//                                                     <MDPagination item onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//                                                         <MdKeyboardArrowLeft />
//                                                     </MDPagination>
//                                                     {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                                                         <MDPagination
//                                                             item
//                                                             key={page}
//                                                             active={page === currentPage}
//                                                             onClick={() => handlePageChange(page)}
//                                                         >
//                                                             {page}
//                                                         </MDPagination>
//                                                     ))}
//                                                     <MDPagination item onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
//                                                         <MdKeyboardArrowRight />
//                                                     </MDPagination>
//                                                 </MDPagination>
//                                             </MDBox>
//                                         )}
//                                     </>
//                                 )}
//                             </MDBox>
//                         </Card>
//                     </Grid>
//                 </Grid>
//             </MDBox>
//         </DashboardLayout>
//     );
// }

// export default PaymentHistoryAdmin;
// AllHistoryCombined.js

import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMaterialUIController } from "context";
import { logout } from "layouts/common";

function PaymentHistoryAdmin() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;
    const [historyList, setHistoryList] = useState([]);
    const token = localStorage.getItem("authToken");

    const fetchAllHistory = async () => {
        if (!token) {
            logout();
            return;
        }

        try {
            const baseURL = process.env.REACT_APP_BASE_URL;

            // Fetch payment history
            const [paymentRes, sweetRes] = await Promise.all([
                axios.get(`${baseURL}api/admin/payment-history`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { modelType: "payment", per_page: 100 },
                }),
                axios.get(`${baseURL}api/admin/payment-history`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { modelType: "sweet", per_page: 100 },
                }),
            ]);

            const paymentData = paymentRes.data.data.map((item) => ({
                
                type: "Payment",
                userName: item.userId?.name || "N/A",
                amount: `₹${item.amount}`,
                itemName: item.invitationName || "-",
                orderId: item.razorpay_order_id || "-",
                date: new Date(item.createdAt).toLocaleDateString("hi-IN"),
                createdAtRaw: new Date(item.createdAt)
            }));

            const sweetData = sweetRes.data.data.map((item) => ({
                _id: item._id,
                type: "Sweet",
                userName: item.userId?.name || "N/A",
                amount: `₹${item.amount}`,
                itemName: item.sweet || "-",
                orderId: item.razorpay_order_id || "-",
                date: new Date(item.createdAt).toLocaleDateString("hi-IN"),
                createdAtRaw: new Date(item.createdAt)
            }));

            // Combine and sort both
            const combined = [...paymentData, ...sweetData].sort((a, b) => b.createdAtRaw - a.createdAtRaw);

            setHistoryList(combined);
        } catch (err) {
            console.error("Error fetching combined history:", err);
            setHistoryList([]);
        }
    };

    useEffect(() => {
        fetchAllHistory();
    }, []);

    const columns = [
        // { Header: "id", accessor: "id", align: "left" },

        { Header: "Type", accessor: "type", align: "left" },
        { Header: "User", accessor: "userName", align: "left" },
        { Header: "Amount", accessor: "amount", align: "left" },
        { Header: "Item", accessor: "itemName", align: "left" }, // Invitation or Sweet
        { Header: "Order ID", accessor: "orderId", align: "left" },
        { Header: "Date", accessor: "date", align: "left" },
    ];

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor={sidenavColor} borderRadius="lg" coloredShadow="info">
                                <MDTypography variant="h6" color="white">All Payment History </MDTypography>
                            </MDBox>
                            <MDBox pt={3} pb={3}>
                                {historyList.length > 0 ? (
                                    <DataTable
                                        table={{ columns, rows: historyList }}
                                        isSorted={false}
                                        entriesPerPage={false}
                                        showTotalEntries={false}
                                        noEndBorder
                                    />
                                ) : (
                                    <MDTypography textAlign="center" p={2}>No History Found</MDTypography>
                                )}
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
}

export default PaymentHistoryAdmin;
