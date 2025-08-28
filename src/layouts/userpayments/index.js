// // layouts/user-payment-history/index.js

// // @mui material components
// import Grid from "@mui/material/Grid";
// import { Card } from "@mui/material";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

// // Material Dashboard 2 React examples
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import DataTable from "examples/Tables/DataTable";

// // React hooks and router
// import { useEffect, useState } from "react";
// // --- बदलाव 1: useLocation को useParams से बदलें ---
// import {useLocation, useNavigate, useParams } from "react-router-dom"; 
// import axios from "axios";

// // Common functions
// import { logout } from "layouts/common";
// import { useMaterialUIController } from "context";

// function UserPaymentHistory() {
//     const navigate = useNavigate();
//     // --- बदलाव 2: useParams का उपयोग करके URL से userId निकालें ---
//     const { userId } = useParams(); 
//     const [controller] = useMaterialUIController();
//     const { sidenavColor } = controller;

//     // State declarations
//     const [userHistory, setUserHistory] = useState([]);
//     const [userName, setUserName] = useState(""); 
    
//     // --- बदलाव 3: location.state की अब कोई ज़रूरत नहीं है ---
//     const token = localStorage.getItem("authToken");

//     useEffect(() => {
//         // अब हम userId को सीधे useParams से ले रहे हैं, जो URL में मौजूद है
//         if (!userId) {
//             console.error("userid not found in URL");
//             navigate("/users"); 
//             return;
//         }

//         if (!token) {
//             logout(navigate);
//             return;
//         }

//         const fetchUserHistory = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_BASE_URL}api/admin/payment-history/${userId}`, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });

//                 const historyData = response.data.data || [];
                
//                 if (historyData.length > 0 && historyData[0].userId) {
//                     setUserName(historyData[0].userId.name);
//                 }
                
//                 const modifiedData = historyData.map((payment) => ({
//                     _id: payment._id,
//                     amount: `₹${payment.amount}`,
//                     invitationName: payment.invitationName,
//                     orderId: payment.razorpay_order_id,
//                     date: new Date(payment.createdAt).toLocaleDateString("hi-IN"),
//                 }));
                
//                 setUserHistory(modifiedData);

//             } catch (error) {
//                 if (error?.response?.status === 401) logout(navigate);
//                 console.error("error of bring userpayment history:", error);
//                 setUserHistory([]);
//             }
//         };

//         fetchUserHistory();
//     }, [userId, navigate, token]); // useEffect की dependencies

//     const columns = [
//         { Header: "ID", accessor: "serialNo", width: "5%", align: "left" },
//         { Header: "Amount", accessor: "amount", width: "15%", align: "left" },
//         { Header: "Invitation Name", accessor: "invitationName", width: "30%", align: "left" },
//         { Header: "Order ID", accessor: "orderId", width: "25%", align: "left" },
//         { Header: "Date", accessor: "date", width: "15%", align: "left" },
//     ];

//     const rows = userHistory.map((payment, index) => ({
//         serialNo: (
//             <MDTypography component="p" variant="caption" color="text">{index + 1}</MDTypography>
//         ),
//         amount: (
//             <MDTypography component="p" variant="caption" color="text">{payment.amount}</MDTypography>
//         ),
//         invitationName: (
//             <MDTypography component="p" variant="caption" color="text">{payment.invitationName}</MDTypography>
//         ),
//         orderId: (
//             <MDTypography component="p" variant="caption" color="text">{payment.orderId}</MDTypography>
//         ),
//         date: (
//             <MDTypography component="p" variant="caption" color="text">{payment.date}</MDTypography>
//         ),
//     }));

//     return (
//         <DashboardLayout>
//             <DashboardNavbar />
//             <MDBox pt={6} pb={3}>
//                 <Card>
//                     <MDBox
//                         mx={2} mt={-3} py={3} px={2}
//                         variant="gradient" bgColor={sidenavColor} borderRadius="lg" coloredShadow="info"
//                         display="flex" justifyContent="space-between" alignItems="center"
//                     >
//                         {/* <MDTypography variant="h6" color="white">
//                             {userName ? `Payment History for: ${userName}` : ""}
//                         </MDTypography> */}
//                          <MDTypography variant="h6" color="white">
//                             Payment History for: {userName || ""}
//                         </MDTypography>
                        

//                     </MDBox>
//                     <MDBox pt={3}>
//                         {userHistory.length === 0 ? (
//                             <MDTypography sx={{ textAlign: "center", p: 3 }}>
//                                 No Payment History Found for this User.
//                             </MDTypography>
//                         ) : (
//                             <DataTable
//                                 table={{ columns, rows }}
//                                 isSorted={false}
//                                 entriesPerPage={true}
//                                 showTotalEntries={true}
//                                 noEndBorder
//                             />
//                         )}
//                     </MDBox>
//                 </Card>
//             </MDBox>
//         </DashboardLayout>
//     );
// }

// export default UserPaymentHistory;


// import Grid from "@mui/material/Grid";
// import { Card, Pagination } from "@mui/material";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import DataTable from "examples/Tables/DataTable";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { logout } from "layouts/common";
// import { useMaterialUIController } from "context";

// function UserPaymentHistory() {
//   const navigate = useNavigate();
//   const { userId } = useParams();
//   const [controller] = useMaterialUIController();
//   const { sidenavColor } = controller;

//   const [userHistory, setUserHistory] = useState([]);
//   const [userName, setUserName] = useState("");
//   const [currentPage, setCurrentPage] = useState(1); // Start from page 1
//   const [totalPages, setTotalPages] = useState(1);
//   const rowsPerPage = 10;
//   const token = localStorage.getItem("authToken");

//   useEffect(() => {
//     if (!userId) {
//       console.error("userid not found in URL");
//       navigate("/users");
//       return;
//     }

//     if (!token) {
//       logout(navigate);
//       return;
//     }

//     const fetchUserHistory = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_BASE_URL}api/admin/payment-history/${userId}?page=${currentPage}&limit=${rowsPerPage}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const { data = [], total = 0 } = response.data;

//         if (data.length > 0 && data[0].userId) {
//           setUserName(data[0].userId.name);
//         }

//         const modifiedData = data.map((entry, index) => ({
//           _id: entry._id,
//           type: entry.type === "sweet" ? "Sweet" : "Invitation",
//           amount: `₹${entry.amount}`,
//           invitationName: entry.invitationName || entry.sweet || "-",
//           orderId: entry.razorpay_order_id,
//           date: new Date(entry.createdAt).toLocaleDateString("hi-IN"),
//         }));

//         setUserHistory(modifiedData);
//         setTotalPages(Math.ceil(total / rowsPerPage));
//       } catch (error) {
//         if (error?.response?.status === 401) logout(navigate);
//         console.error("Error fetching user payment history:", error);
//         setUserHistory([]);
//         setTotalPages(1);
//       }
//     };

//     fetchUserHistory();
//   }, [userId, currentPage, navigate, token]);

//   const columns = [
//     { Header: "ID", accessor: "serialNo", width: "5%", align: "left" },
//     { Header: "Type", accessor: "type", width: "10%", align: "left" },
//     { Header: "Amount", accessor: "amount", width: "15%", align: "left" },
//     { Header: "Item/Invitation", accessor: "invitationName", width: "30%", align: "left" },
//     { Header: "Order ID", accessor: "orderId", width: "25%", align: "left" },
//     { Header: "Date", accessor: "date", width: "15%", align: "left" },
//   ];

//   const rows = userHistory.map((entry, index) => ({
//     serialNo: (
//       <MDTypography component="p" variant="caption" color="text">
//         {(currentPage - 1) * rowsPerPage + index + 1}
//       </MDTypography>
//     ),
//     type: (
//       <MDTypography component="p" variant="caption" color="text">
//         {entry.type}
//       </MDTypography>
//     ),
//     amount: (
//       <MDTypography component="p" variant="caption" color="text">
//         {entry.amount}
//       </MDTypography>
//     ),
//     invitationName: (
//       <MDTypography component="p" variant="caption" color="text">
//         {entry.invitationName}
//       </MDTypography>
//     ),
//     orderId: (
//       <MDTypography component="p" variant="caption" color="text">
//         {entry.orderId}
//       </MDTypography>
//     ),
//     date: (
//       <MDTypography component="p" variant="caption" color="text">
//         {entry.date}
//       </MDTypography>
//     ),
//   }));

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox pt={6} pb={3}>
//         <Card>
//           <MDBox
//             mx={2}
//             mt={-3}
//             py={3}
//             px={2}
//             variant="gradient"
//             bgColor={sidenavColor}
//             borderRadius="lg"
//             coloredShadow="info"
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//           >
//             <MDTypography variant="h6" color="white">
//               Payment History for: {userName || ""}
//             </MDTypography>
//           </MDBox>
//           <MDBox pt={3}>
//             {userHistory.length === 0 ? (
//               <MDTypography sx={{ textAlign: "center", p: 3 }}>
//                 No Payment History Found for this User.
//               </MDTypography>
//             ) : (
//               <>
//                 <DataTable
//                   table={{ columns, rows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 />
//                 <MDBox display="flex" justifyContent="center" mt={2} mb={2}>
//                   {/* <Pagination
//                     count={totalPages}
//                     page={currentPage}
//                     onChange={(e, value) => setCurrentPage(value)}
//                     color=""
//                   /> */}
//                   <Pagination
//   count={totalPages}
//   page={currentPage}
//   onChange={(e, value) => setCurrentPage(value)}
//   color="primary"
//   sx={{
//     '& .MuiPaginationItem-root': {
//       borderRadius: '50%',
//     },
//     '& .Mui-selected': {
//       backgroundColor: '#1A73E8', // Blue color
//       color: '#fff',
//       '&:hover': {
//         backgroundColor: '#1669C1',
//       },
//     },
//   }}
// />

//                 </MDBox>
//               </>
//             )}
//           </MDBox>
//         </Card>
//       </MDBox>
//     </DashboardLayout>
//   );
// }

// export default UserPaymentHistory;
// frontend/src/layouts/UserPaymentHistory/index.js

import Grid from "@mui/material/Grid";
import { Card, Pagination } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { logout } from "layouts/common";
import { useMaterialUIController } from "context";

function UserPaymentHistory() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [controller] = useMaterialUIController();
  const { sidenavColor } = controller;

  const [userHistory, setUserHistory] = useState([]);
  const [userName, setUserName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 10; // This should match your backend's default limit or be passed
  const token = localStorage.getItem("authToken");

  useEffect(() => {
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
        // Ensure this URL matches your backend route
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}api/admin/payment-history/${userId}?page=${currentPage}&limit=${rowsPerPage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Destructure data, total, page, and limit from the response
        const { data = [], total = 0, page } = response.data;

        // Set current page from response if available, otherwise keep local state
        setCurrentPage(page || 1);

        if (data.length > 0 && data[0].userId) {
          setUserName(data[0].userId.name);
        } else {
          // If no data or user info, clear username
          setUserName("");
        }

        const modifiedData = data.map((entry) => ({
          _id: entry._id,
          type: entry.type === "sweet" ? "Sweet" : "Invitation",
          amount: `₹${entry.amount}`,
          // Determine which field to display for the item name
          invitationName: entry.type === "sweet" ? entry.sweet : entry.invitationName || "-",
          orderId: entry.razorpay_order_id,
          date: new Date(entry.createdAt).toLocaleDateString("hi-IN"),
        }));

        setUserHistory(modifiedData);
        setTotalPages(Math.ceil(total / rowsPerPage));
      } catch (error) {
        if (error?.response?.status === 401) {
          logout(navigate);
        } else {
          console.error("Error fetching user payment history:", error);
        }
        setUserHistory([]);
        setTotalPages(1);
        setUserName(""); // Clear user name on error
      }
    };

    fetchUserHistory();
  }, [userId, currentPage, navigate, token, rowsPerPage]); // Add rowsPerPage to dependencies

  const columns = [
    { Header: "ID", accessor: "serialNo", width: "5%", align: "left" },
    { Header: "Type", accessor: "type", width: "10%", align: "left" },
    { Header: "Amount", accessor: "amount", width: "15%", align: "left" },
    { Header: "Item/Invitation", accessor: "invitationName", width: "30%", align: "left" },
    { Header: "Order ID", accessor: "orderId", width: "25%", align: "left" },
    { Header: "Date", accessor: "date", width: "15%", align: "left" },
  ];

  const rows = userHistory.map((entry, index) => ({
    serialNo: (
      <MDTypography component="p" variant="caption" color="text">
        {(currentPage - 1) * rowsPerPage + index + 1}
      </MDTypography>
    ),
    type: (
      <MDTypography component="p" variant="caption" color="text">
        {entry.type}
      </MDTypography>
    ),
    amount: (
      <MDTypography component="p" variant="caption" color="text">
        {entry.amount}
      </MDTypography>
    ),
    invitationName: (
      <MDTypography component="p" variant="caption" color="text">
        {entry.invitationName}
      </MDTypography>
    ),
    orderId: (
      <MDTypography component="p" variant="caption" color="text">
        {entry.orderId}
      </MDTypography>
    ),
    date: (
      <MDTypography component="p" variant="caption" color="text">
        {entry.date}
      </MDTypography>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor={sidenavColor}
            borderRadius="lg"
            coloredShadow="info"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <MDTypography variant="h6" color="white">
              Payment History for: {userName || "Loading..."}
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            {userHistory.length === 0 && totalPages === 1 ? ( // Check totalPages for a more accurate "no history"
              <MDTypography sx={{ textAlign: "center", p: 3 }}>
                No Payment History Found for this User.
              </MDTypography>
            ) : (
              <>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
                <MDBox display="flex" justifyContent="center" mt={2} mb={2}>
<Pagination
  count={totalPages}
  page={currentPage}
  onChange={(e, value) => setCurrentPage(value)}
  color="primary" // This will make the default 'primary' color for selected items if not overridden
  sx={{
    // Styles for the individual page items (including arrows and numbers)
    '& .MuiPaginationItem-root': {
      borderRadius: '50%', // Makes them circular
      border: '1px solid #D9D9D9', // Light grey border for unselected items
      color: '#8C8C8C', // Grey text color for unselected items
      backgroundColor: '#fff', // White background for unselected items
      '&:hover': {
        backgroundColor: '#f0f0f0', // Slightly darker hover background
      },
    },
    // Styles specifically for the selected page item
    '& .MuiPaginationItem-root.Mui-selected': {
      backgroundColor: '#1A73E8', // Solid blue background for selected item
      color: '#fff', // White text color for selected item
      borderColor: '#1A73E8', // Blue border for selected item
      '&:hover': {
        backgroundColor: '#1669C1', // Slightly darker blue on hover for selected item
        borderColor: '#1669C1',
      },
    },
    // Styles for the arrow buttons
    '& .MuiPaginationItem-previousNext': {
      // These will inherit the general '.MuiPaginationItem-root' styles
      // but you can add specific overrides if needed
    },
  }}
/>
                </MDBox>
              </>
            )}
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default UserPaymentHistory;