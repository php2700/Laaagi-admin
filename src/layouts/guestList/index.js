// GuestListAdmin.js

// @mui material components
import Grid from "@mui/material/Grid";
import { Card } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDPagination from "components/MDPagination";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// React hooks and router
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Context and common functions
import { useMaterialUIController } from "context";
import { logout } from "layouts/common"; 

// Icons
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function GuestListAdmin() {
    const navigate = useNavigate();
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    // State declarations
    const [guestData, setGuestData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    // Pagination states
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(10); 

    const token = localStorage.getItem("authToken"); 

    const getGuestData = async (page, searchQuery) => {
        if (!token) {
            logout(navigate);
            return;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}api/admin/all-guests`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    q: searchQuery,
                    page: page,
                    per_page: perPage
                }
            });

            const guestListData = response.data.guests || [];
            
            if (response.data.pagination) {
                setTotalPages(response.data.pagination.totalPages || 0);
                setCurrentPage(response.data.pagination.currentPage || 1);
            }

            const modifiedData = guestListData.map((guest) => ({
                _id: guest._id, 
               name: guest.name || "N/A",
                mobile: guest.mobile || "N/A",
                email: guest.email || "N/A",
                address: guest.address || "N/A",
                guestNo: guest.guestNo || "N/A",
                category: guest.category || "N/A",
                createdBy: guest.userId?.name || "Unknown User", 
            }));
            
            setGuestData(modifiedData);

        } catch (error) {
            if (error?.response?.status === 401) {
                logout(navigate);
            }
            console.error("गेस्ट सूची लाने में त्रुटि:", error);
            setGuestData([]); 
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        getGuestData(currentPage, search);
    }, [currentPage, search]);

    const columns = [
        { Header: "ID", accessor: "orderId", width: "1%", align: "left" },
        { Header: "Guest Name", accessor: "name", width: "15%", align: "left" },
        { Header: "Created By", accessor: "createdBy", width: "15%", align: "left" },
        { Header: "Mobile", accessor: "mobile", width: "10%", align: "left" },
        { Header: "Address", accessor: "address", width: "25%", align: "left" },
        { Header: "Category", accessor: "category", width: "10%", align: "left" },
    ];

    const rows = guestData.map((guest, index) => ({
        orderId: (
            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
                {(currentPage - 1) * perPage + index + 1}
            </MDTypography>
        ),
        name: (
            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
                {guest.name}
            </MDTypography>
        ),
        createdBy: (
            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
                {guest.createdBy}
            </MDTypography>
        ),
        mobile: (
            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
                {guest.mobile}
            </MDTypography>
        ),
        address: (
            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
                {guest.address}
            </MDTypography>
        ),
         pin_code: (
        <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
            {guest.pin_code}
        </MDTypography>
    ),
        category: (
            <MDTypography component="p" variant="caption" color="text" fontWeight="medium">
                {guest.category}
            </MDTypography>
        ),
    }));

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2} mt={-3} py={3} px={2}
                                variant="gradient" bgColor={sidenavColor} borderRadius="lg" coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white">
                                    All Guests
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3}>
                                {/* <MDBox mx={2} mb={2} display="flex" justifyContent="flex-end">
                                    <MDInput
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setCurrentPage(1); 
                                        }}
                                        label="Search here"
                                    />
                                </MDBox> */}
                                {guestData.length === 0 ? (
                                    <MDTypography sx={{ textAlign: "center", fontWeight: "500", padding: "20px" }}>
                                        No Guests Found
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
                                        {totalPages > 1 && (
                                            <MDBox display="flex" justifyContent="center" p={2}>
                                                <MDPagination>
                                                    <MDPagination item onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                                        <MdKeyboardArrowLeft />
                                                    </MDPagination>
                                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                        <MDPagination
                                                            item
                                                            key={page}
                                                            active={page === currentPage}
                                                            onClick={() => handlePageChange(page)}
                                                        >
                                                            {page}
                                                        </MDPagination>
                                                    ))}
                                                    <MDPagination item onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                                        <MdKeyboardArrowRight />
                                                    </MDPagination>
                                                </MDPagination>
                                            </MDBox>
                                        )}
                                    </>
                                )}
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
}

export default GuestListAdmin;