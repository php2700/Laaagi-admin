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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import { Card } from "@mui/material";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import bannerTableData from "layouts/billing/components/bannerTableData";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import MDPagination from "components/MDPagination";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import { useMaterialUIController } from "context";
import View_Customization from "./view";
import MDInput from "components/MDInput";
import { debounce } from "lodash";



function Customization() {
    const navigate = useNavigate();
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;
    const [customizationData, setCustomizationData] = useState([]);
    const [newPage, setNewPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [total_rows, setTotal_rows] = useState("");
    const [first_page_url, setFirstpageurl] = useState("");
    const [from, setFrom] = useState("");
    const [last_page, setLastpage] = useState("");
    const [last_page_url, setLastpageurl] = useState("");
    const [next_page_url, setNextpageurl] = useState("");
    const [links, setLinks] = useState("");
    const [total, setTotal] = useState("");
    const [prev_page_url, setPrevpageurl] = useState("");
    const [search, setSearch] = useState("");
    const [path, setPath] = useState("");

    const [opendetailsmodel, setOpenDetailsModel] = useState(false);
    const [clientDetails, setClientDetails] = useState([]);
    const [showModel, setShowModel] = useState(false);
    const [per_page, setPer_page] = useState(10);
    const [current_page, setCurrentpage] = useState("");
    const [open, setOpen] = useState(false);
    const [viewData, setViewData] = useState();
    const [id, setId] = useState();

    const token = localStorage.getItem("authToken");
    const getCustomizationData = async (page, search) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}api/admin/customization-list`,
                {
                    params: {
                        page: page,
                        search: search,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const datas = response?.data?.customizationData?.data;
            setTotal_rows(response?.data?.customizationData?.total);
            setFirstpageurl(response?.data?.customizationData?.first_page_url);
            setFrom(response?.data?.customizationData?.from);
            setLastpage(response?.data?.customizationData?.last_page);
            setLastpageurl(response?.data?.customizationData?.last_page_url);
            setLinks(response?.data?.customizationData?.links);
            setNextpageurl(response?.data?.customizationData?.next_page_url);
            setPath(response?.data?.customizationData?.path);
            setPer_page(response?.data?.customizationData?.per_page);
            setPrevpageurl(response?.data?.customizationData?.prev_page_url);
            setTotal(response?.data?.customizationData?.total);
            setCurrentpage(response?.data?.customizationData?.current_page);

            const modifiedData = datas.map((customization) => {
                const newDate = new Date(customization?.createdAt);
                const formatedDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart("2", '0')}-${String(newDate.getDate()).padStart("2", "0")}`

                return {
                    _id: customization._id,
                    firstName: customization?.firstName,
                    lastName: customization?.lastName,
                    message: customization?.message,
                    mobile: customization?.mobile,
                    image: customization?.invitationId?.image,
                    boxName: customization?.invitationId?.name,
                    createdAt: formatedDate

                };
            });
            console.log(modifiedData, "2222222222222")
            setCustomizationData(modifiedData);
        } catch (error) {
            console.error("Error fetching banner data:", error);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setNewPage(page);
        }
    };

    const handleView = (data) => {
        setViewData(data)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };




    const ApiCall = () => {
        getCustomizationData(newPage, searchText);
    };
    // Calculate the total number of pages based on the data you receive
    const totalPages = Math.ceil(total_rows / per_page);
    const maxPageNumbers = 5;
    const currentPage = current_page; // Example: Replace with your current page
    const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    const pageNumbers = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
    );

    useEffect(() => {
        getCustomizationData(newPage, search);
    }, [newPage, search]);

    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
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
                                >
                                    <MDTypography variant="h6" color="white">
                                        Customization
                                    </MDTypography>
                                </MDBox>
                                <MDBox pt={3}>
                                    <MDBox mx={2} mb={2} textAlign="right">
                                        <MDBox pr={1}>
                                            <MDInput
                                                value={search}
                                                onChange={(e) => {
                                                    setSearch(e.target.value)
                                                }}
                                                label="Search here" />
                                        </MDBox>
                                    </MDBox>
                                    {customizationData?.length === 0 ? (
                                        <p style={{ textAlign: "center", fontWeight: "500", paddingBottom: "10px" }}>
                                            No Data Found
                                        </p>
                                    ) : (
                                        <div>
                                            <DataTable
                                                table={{
                                                    columns: [
                                                        { Header: "ID", accessor: "orderId", width: "1%", align: "left" },
                                                        {
                                                            Header: "Box Image",
                                                            accessor: "boxImage",
                                                            width: "15%",
                                                            align: 'left'
                                                        },
                                                        {
                                                            Header: "Box Name",
                                                            accessor: "boxName",
                                                            width: "15%",
                                                            align: 'left'
                                                        },
                                                        {
                                                            Header: "First Name ",
                                                            accessor: "firstName",
                                                            width: "15%",
                                                            align: "left",
                                                        },
                                                        {
                                                            Header: "Last Name ",
                                                            accessor: "lastName",
                                                            width: "15%",
                                                            align: "left",
                                                        },
                                                        {
                                                            Header: "Mobile ",
                                                            accessor: "Mobile",
                                                            width: "15%",
                                                            align: "left",
                                                        },
                                                        {
                                                            Header: "Created ",
                                                            accessor: "Created",
                                                            width: "20%",
                                                            align: "left",
                                                        },
                                                        {
                                                            Header: "Message ",
                                                            accessor: "Message",
                                                            width: "15%",
                                                            align: "left",
                                                        },


                                                    ],

                                                    rows: customizationData.map((user, index) => ({
                                                        orderId: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {index + 1}
                                                            </MDTypography>
                                                        ),
                                                        boxImage: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium">
                                                                <img
                                                                    src={`${process.env.REACT_APP_BASE_URL}uploads/${user?.image}`}
                                                                    alt="invitation"
                                                                    style={{ width: "100px", height: "100px", borderRadius: "5px" }}
                                                                />
                                                            </MDTypography>
                                                        ),
                                                        boxName: (
                                                            <MDTypography component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >{user?.boxName}</MDTypography>
                                                        ),
                                                        firstName: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {user?.firstName}
                                                            </MDTypography>
                                                        ),
                                                        lastName: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {user?.lastName}
                                                            </MDTypography>
                                                        ),
                                                        Mobile: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {user?.mobile}
                                                            </MDTypography>
                                                        ),
                                                        Message: (
                                                            <MDButton
                                                                variant='gradient' color='info'
                                                                onClick={() => handleView(user?.message)}
                                                            >
                                                                view
                                                            </MDButton>

                                                        ),
                                                        Created: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {user?.createdAt}
                                                            </MDTypography>
                                                        ),
                                                    })),
                                                }}
                                                isSorted={false}
                                                entriesPerPage={false}
                                                showTotalEntries={false}
                                                noEndBorder
                                            />
                                            <div className="page_number">
                                                <MDPagination>
                                                    <MDPagination
                                                        item
                                                        key="prev"
                                                        onClick={() => handlePageChange(current_page - 1)}
                                                    >
                                                        <span className="admin_paginetions_iocn">
                                                            <MdKeyboardArrowLeft />
                                                        </span>
                                                    </MDPagination>

                                                    {pageNumbers.map((pageNumber) => (
                                                        <MDPagination
                                                            item
                                                            key={pageNumber}
                                                            active={pageNumber === current_page}
                                                            onClick={() => handlePageChange(pageNumber, search)}
                                                        >
                                                            {pageNumber}
                                                        </MDPagination>
                                                    ))}

                                                    <MDPagination
                                                        item
                                                        key="next"
                                                        onClick={() => handlePageChange(current_page + 1)}
                                                    >
                                                        <span className="admin_paginetions_iocn">
                                                            <MdKeyboardArrowRight />
                                                        </span>
                                                    </MDPagination>
                                                </MDPagination>
                                            </div>
                                        </div>
                                    )}
                                </MDBox>
                            </Card>
                        </Grid>
                    </Grid>
                </MDBox>
            </DashboardLayout>
            <View_Customization
                open={open}
                handleClose={handleClose}
                data={viewData}
            />
        </>
    );
}

export default Customization;
