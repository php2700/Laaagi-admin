// // layouts/user-guest-list/index.js

// // @mui and other imports...
// import Grid from "@mui/material/Grid";
// import { Card } from "@mui/material";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import DataTable from "examples/Tables/DataTable";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { logout } from "layouts/common";
// import { useMaterialUIController } from "context";
// import {ExpandableText} from "layouts/guesthistory/expand";

// function UserGuestList() {
//     const navigate = useNavigate();
//     const { userId } = useParams(); // URL से userId पकड़ें
//     const [controller] = useMaterialUIController();
//     const { sidenavColor } = controller;

//     // State declarations
//     const [userGuests, setUserGuests] = useState([]);
//     const [userName, setUserName] = useState("");

//     const token = localStorage.getItem("authToken");

//     useEffect(() => {
//         if (!userId) {
//             navigate("/users");
//             return;
//         }
//         if (!token) {
//             logout(navigate);
//             return;
//         }

//         const fetchUserGuests = async () => {
//             try {
//                 // हमारी नई गेस्ट API को कॉल करें
//                 const response = await axios.get(`${process.env.REACT_APP_BASE_URL}api/admin/all-guests/${userId}`, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });

//                 const guestData = response.data.data || [];

//                 if (guestData.length > 0 && guestData[0].userId) {
//                     setUserName(guestData[0].userId.name);
//                 }

//                 // गेस्ट स्कीमा के अनुसार डेटा को मैप करें
//                 const modifiedData = guestData.map((guest) => ({
//                     _id: guest._id,
//                     name: guest.name || "N/A",
//                     mobile: guest.mobile || "N/A",
//                     address: guest.address || "N/A",
//                     category: guest.category || "N/A",
//                 }));

//                 setUserGuests(modifiedData);

//             } catch (error) {
//                 if (error?.response?.status === 401) logout(navigate);
//                 console.error("यूज़र के गेस्ट्स लाने में त्रुटि:", error);
//                 setUserGuests([]);
//             }
//         };

//         fetchUserGuests();
//     }, [userId, navigate, token]);

//     // DataTable के लिए कॉलम
//     const columns = [
//         { Header: "ID", accessor: "serialNo", width: "5%", align: "left" },
//         { Header: "Name", accessor: "name", width: "25%", align: "left" },
//         { Header: "Mobile", accessor: "mobile", width: "20%", align: "left" },
//         { Header: "Address", accessor: "address", width: "30%", align: "left" },
//         { Header: "Category", accessor: "category", width: "15%", align: "left" },
//     ];

//     // DataTable के लिए पंक्तियाँ (rows)
//     const rows = userGuests.map((guest, index) => ({
//         serialNo: <MDTypography variant="caption" color="text">{index + 1}</MDTypography>,
//         name: <MDTypography variant="caption" color="text">{guest.name}</MDTypography>,
//         mobile: <MDTypography variant="caption" color="text">{guest.mobile}</MDTypography>,
//         address: <MDTypography variant="caption" color="text">{guest.address}</MDTypography>,
//         category: <MDTypography variant="caption" color="text">{guest.category}</MDTypography>,

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
//                         <MDTypography variant="h6" color="white">
//                             Guest List for: {userName || ""}
//                         </MDTypography>

//                     </MDBox>
//                     <MDBox pt={3} >
//                         {userGuests.length === 0 ? (
//                             <MDTypography sx={{ textAlign: "center", p: 3 }}>
//                                 No Guests Found for this User.
//                             </MDTypography>
//                         ) : (
//                             <DataTable
//                                 table={{ columns, rows }}

//                                 noEndBorder
//                             />
//                         )}
//                     </MDBox>
//                 </Card>
//             </MDBox>
//         </DashboardLayout>
//     );
// }

// export default UserGuestList;

// @mui and other imports...
// import Grid from "@mui/material/Grid";
// import { Card } from "@mui/material";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import DataTable from "examples/Tables/DataTable";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { logout } from "layouts/common";
// import { useMaterialUIController } from "context";
// import PropTypes from "prop-types";
// import  ExpandableText  from "./Expand"


// // ✅ ExpandableText component inline


// function UserGuestList() {
//   const navigate = useNavigate();
//   const { userId } = useParams();
//   const [controller] = useMaterialUIController();
//   const { sidenavColor } = controller;

//   const [userGuests, setUserGuests] = useState([]);
//   const [userName, setUserName] = useState("");

//   const token = localStorage.getItem("authToken");

//   useEffect(() => {
//     if (!userId) {
//       navigate("/users");
//       return;
//     }
//     if (!token) {
//       logout(navigate);
//       return;
//     }

//     const fetchUserGuests = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_BASE_URL}api/admin/all-guests/${userId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const guestData = response.data.data || [];

//         if (guestData.length > 0 && guestData[0].userId) {
//           setUserName(guestData[0].userId.name);
//         }

//         const modifiedData = guestData.map((guest) => ({
//           _id: guest._id,
//           name: guest.name || "N/A",
//           mobile: guest.mobile || "N/A",
//           address: guest.address || "N/A",
//           category: guest.category || "N/A",
//         }));

//         setUserGuests(modifiedData);
//       } catch (error) {
//         if (error?.response?.status === 401) logout(navigate);
//         console.error("यूज़र के गेस्ट्स लाने में त्रुटि:", error);
//         setUserGuests([]);
//       }
//     };

//     fetchUserGuests();
//   }, [userId, navigate, token]);

//   const columns = [
//     { Header: "ID", accessor: "serialNo", width: "5%", align: "left" },
//     { Header: "Name", accessor: "name", width: "25%", align: "left" },
//     { Header: "Mobile", accessor: "mobile", width: "20%", align: "left" },
//     { Header: "Address", accessor: "address", width: "30%", align: "left" },
//     { Header: "Category", accessor: "category", width: "15%", align: "left" },
//   ];

//   const rows = userGuests.map((guest, index) => ({
//     serialNo: <MDTypography variant="caption" color="text">{index + 1}</MDTypography>,
//     name: <MDTypography variant="caption" color="text">{guest.name}</MDTypography>,
//     mobile: <MDTypography variant="caption" color="text">{guest.mobile}</MDTypography>,
//     address: <ExpandableText text={guest.address} />, // ✅ UPDATED HERE
//     category: <MDTypography variant="caption" color="text">{guest.category}</MDTypography>,
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
//               Guest List for: {userName || ""}
//             </MDTypography>
//           </MDBox>
//           <MDBox pt={3}>
//             {userGuests.length === 0 ? (
//               <MDTypography sx={{ textAlign: "center", p: 3 }}>
//                 No Guests Found for this User.
//               </MDTypography>
//             ) : (
//               <DataTable table={{ columns, rows }} noEndBorder />
//             )}
//           </MDBox>
//         </Card>
//       </MDBox>
//     </DashboardLayout>
//   );
// }

// export default UserGuestList;
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import PaginationItem from "@mui/material/PaginationItem";

import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { logout } from "layouts/common";
import { useMaterialUIController } from "context";
import PropTypes from "prop-types";
import ExpandableText from "./Expand";
import Pagination from "@mui/material/Pagination"; // Import Pagination component
import Stack from "@mui/material/Stack";
// Import Stack for layout

function UserGuestList() {
  const navigate = useNavigate();
  // const { userId } = useParams();
  const location = useLocation();
  const userId = location.state?.userId;
  const initialUserName = location.state?.userName;
  const [controller] = useMaterialUIController();
  const { sidenavColor } = controller;

  const [userGuests, setUserGuests] = useState([]);
  const [userName, setUserName] = useState(initialUserName || "");
  // const [userName, setUserName] = useState("");
  const [page, setPage] = useState(1); // Current page
  const [limit, setLimit] = useState(10); // Items per page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [totalGuests, setTotalGuests] = useState(0); // Total number of guests

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
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}api/admin/all-guests/${userId}?page=${page}&limit=${limit}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const guestData = response.data.data || [];
        const total = response.data.total || 0;

        if (guestData.length > 0 && guestData[0].userId) {
          setUserName(guestData[0].userId.name);
        }

        const modifiedData = guestData.map((guest, index) => ({
          _id: guest._id,
          serialNo: (page - 1) * limit + index + 1, // Calculate serial number based on page
          name: guest.name || "N/A",
          mobile: guest.mobile || "N/A",
          address: guest.address || "N/A",
          category: guest.category || "N/A",
        }));

        setUserGuests(modifiedData);
        setTotalGuests(total);
        setTotalPages(Math.ceil(total / limit)); // Calculate total pages
      } catch (error) {
        if (error?.response?.status === 401) logout(navigate);
        console.error("यूज़र के गेस्ट्स लाने में त्रुटि:", error);
        setUserGuests([]);
        setTotalGuests(0);
        setTotalPages(0);
      }
    };

    fetchUserGuests();
  }, [userId, navigate, token, page, limit]); // Add page and limit to dependencies

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const columns = [
    { Header: "ID", accessor: "serialNo", width: "5%", align: "left" },
    { Header: "Name", accessor: "name", width: "25%", align: "left" },
    { Header: "Mobile", accessor: "mobile", width: "20%", align: "left" },
    { Header: "Address", accessor: "address", width: "30%", align: "left" },
    { Header: "Category", accessor: "category", width: "15%", align: "left" },
  ];

  const rows = userGuests.map((guest) => ({
    serialNo: <MDTypography variant="caption" color="text">{guest.serialNo}</MDTypography>,
    name: <MDTypography variant="caption" color="text">{guest.name}</MDTypography>,
    mobile: <MDTypography variant="caption" color="text">{guest.mobile}</MDTypography>,
    address: <ExpandableText text={guest.address} />,
    category: <MDTypography variant="caption" color="text">{guest.category}</MDTypography>,
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
              Guest List for: {userName || ""} ({totalGuests} guests total)
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
            {userGuests.length === 0 && totalGuests === 0 ? (
              <MDTypography sx={{ textAlign: "center", p: 3 }}>
                No Guests Found for this User.
              </MDTypography>
            ) : (
              <>
                <DataTable table={{ columns, rows }} noEndBorder />
                {totalPages > 1 && (
                  <MDBox display="flex" justifyContent="center" mt={3} mb={2}>
                    <Stack spacing={2}>
                      {/* <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        renderItem={(item) => (
                          <MDButton
                            variant={item.selected ? "gradient" : "outlined"}
                            color={sidenavColor}
                            onClick={item.onClick}
                            {...item}
                            sx={{ minWidth: '32px', height: '32px', borderRadius: '50%' }} // Style for circular buttons
                          >
                            {item.page}
                          </MDButton>
                        )}
                      /> */}
                      <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        renderItem={(item) => (
                          <PaginationItem
                            {...item}
                            sx={{
                              minWidth: 32,
                              height: 32,
                              borderRadius: "50%",
                              fontSize: "0.875rem",
                              ...(item.selected && {
                                background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
                                color: "#fff",
                                "&:hover": {
                                  background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
                                },
                              }),
                            }}
                          />
                        )}
                      />

                    </Stack>
                  </MDBox>
                )}
              </>
            )}
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default UserGuestList;