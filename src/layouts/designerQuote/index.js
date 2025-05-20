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
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import MDPagination from "components/MDPagination";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import { useMaterialUIController } from "context";
import Header from "layouts/profile/components/Header";
import View_quote from "./view";
import MDInput from "components/MDInput";
import View_Design from "./view";



function DesignerQuote() {
    const navigate = useNavigate();
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;
    const [quoteData, setQuoteData] = useState([]);
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
    const [viewQuoteData, setViewQuoteData] = useState();
    const [id, setId] = useState();

    const token = localStorage.getItem("authToken");
    const getData = async (page, search) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}api/admin/designer-quote-list`,
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
            const datas = response?.data?.quoteData?.data;
            setTotal_rows(response?.data?.quoteData?.total);
            setFirstpageurl(response?.data?.quoteData?.first_page_url);
            setFrom(response?.data?.quoteData?.from);
            setLastpage(response?.data?.quoteData?.last_page);
            setLastpageurl(response?.data?.quoteData?.last_page_url);
            setLinks(response?.data?.quoteData?.links);
            setNextpageurl(response?.data?.quoteData?.next_page_url);
            setPath(response?.data?.quoteData?.path);
            setPer_page(response?.data?.quoteData?.per_page);
            setPrevpageurl(response?.data?.quoteData?.prev_page_url);
            setTotal(response?.data?.quoteData?.total);
            setCurrentpage(response?.data?.quoteData?.current_page);

            const modifiedData = datas.map((quote) => {
                const newDate = new Date(quote?.createdAt);
                const formatedDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart("2", '0')}-${String(newDate.getDate()).padStart("2", "0")}`
console.log(quote,'aaaaaaaaaaaaa')
                return {
                    _id: quote._id,
                    firstName: quote?.firstName,
                    email: quote?.email,
                    lastName: quote?.lastName,
                    message: quote?.message,
                    mobile: quote?.mobile,
                    decorationCategory: quote?.designerId?.category,
                    decorationImage: quote?.designerId?.image,
                    createdAt: formatedDate

                };
            });
            console.log(modifiedData, "2222222222222")
            setQuoteData(modifiedData);
        } catch (error) {
            console.error("Error fetching banner data:", error);
        }
    };

    const handleView = (data) => {
        setViewQuoteData(data);
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setNewPage(page);
        }
    };

    const ApiCall = () => {
        getData(newPage, searchText);
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
        getData(newPage, search);
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
                                        Quote
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
                                    {quoteData?.length === 0 ? (
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
                                                            Header: "Designer Image",
                                                            accessor: "decorationImage",
                                                            width: '15%',
                                                            align: 'left'
                                                        },
                                                        {
                                                            Header: "Designer Category",
                                                            accessor: "decorationCategtory",
                                                            with: '15%',
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
                                                            Header: "Email",
                                                            accessor: "Email",
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

                                                    rows: quoteData.map((user, index) => ({
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
                                                        decorationImage: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                <img src={`${process.env.REACT_APP_BASE_URL}uploads/${user.decorationImage}`}
                                                                    alt="Decoration image"
                                                                    style={{ width: "100px", height: "100px", borderRadius: "5px" }}
                                                                />
                                                            </MDTypography>
                                                        ),
                                                        decorationCategtory: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >{user?.decorationCategory}</MDTypography>
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
                                                        Email: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {user?.email}
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

                                                        Message: (
                                                            <MDButton
                                                                variant='gradient'
                                                                color='info'
                                                                onClick={() => handleView(user?.message)}
                                                            >
                                                                view
                                                            </MDButton>
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
            <View_Design
                open={open}
                handleClose={handleClose}
                data={viewQuoteData}
            />
        </>
    );
}

export default DesignerQuote;
