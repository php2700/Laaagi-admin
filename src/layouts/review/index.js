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
import Delete_Review from "./delete_review";
import View_Review from "./view_review";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


// import Delete_reviews from "./delete_reviews";
// import Edit_reviews from "./edit_reviews";


function Review() {
    const navigate = useNavigate();
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;
    const [reviewData, setReviewData] = useState([]);
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
    const [id, setId] = useState();
    const [viewData, setViewData] = useState();
    const [reviewModelOpen, setReviewModelOpen] = useState(false);

    const token = localStorage.getItem("authToken");
    const getReviewData = async (page, search) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}api/admin/review_list`,
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
            const datas = response?.data?.reviewData?.data;
            setTotal_rows(response?.data?.reviewData?.total);
            setFirstpageurl(response?.data?.reviewData?.first_page_url);
            setFrom(response?.data?.reviewData?.from);
            setLastpage(response?.data?.reviewData?.last_page);
            setLastpageurl(response?.data?.reviewData?.last_page_url);
            setLinks(response?.data?.reviewData?.links);
            setNextpageurl(response?.data?.reviewData?.next_page_url);
            setPath(response?.data?.reviewData?.path);
            setPer_page(response?.data?.reviewData?.per_page);
            setPrevpageurl(response?.data?.reviewData?.prev_page_url);
            setTotal(response?.data?.reviewData?.total);
            setCurrentpage(response?.data?.reviewData?.current_page);

            const modifiedData = datas.map((review) => {
                return {
                    _id: review._id,
                    image: review?.image,
                    name: review?.name,
                    designation: review?.designation,
                    description: review?.description
                };
            });
            setReviewData(modifiedData);
        } catch (error) {
            console.error("Error fetching banner data:", error);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setNewPage(page);
        }
    };

    const ApiCall = () => {
        getReviewData(newPage, searchText);
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
        getReviewData(newPage, searchText);
    }, [newPage, searchText]);

    const handleDelete = (id) => {
        setId(id)
        setOpen(true);
    }

    const handleView = (reviewDescription) => {
        setReviewModelOpen(true)
        setViewData(reviewDescription);

    }

    const handleViewClose = () => {
        setReviewModelOpen(false)
    }


    const handleClose = () => {
        setOpen(false);
    };

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
                                        Reviews
                                    </MDTypography>
                                </MDBox>
                                <MDBox pt={3}>
                                    <MDBox mx={2} mb={2}>
                                        <Link to={`/add-review`}>
                                            <MDButton
                                                component="a"
                                                rel="noreferrer"
                                                variant="gradient"
                                                color={sidenavColor}
                                            >
                                                Add Review
                                            </MDButton>
                                        </Link>
                                    </MDBox>
                                    {reviewData?.length === 0 ? (
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
                                                            Header: "Image ",
                                                            accessor: "Image",
                                                            width: "15%",
                                                            align: "left",
                                                        },
                                                        {
                                                            Header: "Name ",
                                                            accessor: "Name",
                                                            width: "15%",
                                                            align: "left",
                                                        },
                                                        {
                                                            Header: "Designation ",
                                                            accessor: "Designation",
                                                            width: "15%",
                                                            align: "left",
                                                        },
                                                        {
                                                            Header: "Description ",
                                                            accessor: "Description",
                                                            width: "15%",
                                                            align: "left",
                                                        },
                                                        { Header: "Edit", accessor: "Edit", align: "left" },
                                                        { Header: "Action", accessor: "Action", align: "left" },
                                                    ],

                                                    rows: reviewData.map((review, index) => ({
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
                                                        Image: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                <img
                                                                    src={`${process.env.REACT_APP_BASE_URL}uploads/${review?.image}`}
                                                                    alt="Banner"
                                                                    style={{ width: "100px", height: "100px", borderRadius: "5px" }}
                                                                />
                                                            </MDTypography>
                                                        ),
                                                        Name: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {review?.name}
                                                            </MDTypography>
                                                        ),
                                                        Designation: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {review?.designation}
                                                            </MDTypography>
                                                        ),
                                                        Description: (
                                                            // <MDTypography
                                                            //     component="a"
                                                            //     variant="caption"
                                                            //     color="text"
                                                            //     fontWeight="medium"
                                                            // >
                                                            //     {review?.description}
                                                            // </MDTypography>
                                                            <MDButton
                                                                variant="gradient" color="info"
                                                                onClick={() => { handleView(review?.description) }}
                                                            >
                                                                view
                                                            </MDButton>
                                                        ),
                                                        Edit: (
                                                            <Link to={`/edit-review`}
                                                                state={{ reviewData: review }}
                                                            >
                                                                <MDTypography
                                                                    component="span"
                                                                    variant="caption"
                                                                    fontWeight="medium"
                                                                    // onClick={() => handleEdit(review)}
                                                                    sx={{
                                                                        cursor: "pointer",
                                                                        textDecoration: "none",
                                                                        fontSize:'18px'
                                                                    }}
                                                                >
                                                                    <EditIcon/>
                                                                </MDTypography>
                                                            </Link>
                                                        ),
                                                        Action: (
                                                            <MDTypography
                                                                component="span"
                                                                variant="caption"
                                                                color="error"
                                                                fontWeight="medium"
                                                                onClick={() => handleDelete(review._id)}
                                                                sx={{
                                                                    cursor: "pointer",
                                                                    textDecoration: "none",
                                                                    fontSize:'18px'
                                                                }}
                                                            >
                                                                <DeleteIcon />
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
            <Delete_Review
                open={open}
                handleClose={handleClose}
                data={getReviewData}
                id={id}
            />

            <View_Review
                open={reviewModelOpen}
                handleClose={handleViewClose}
                data={viewData}
            />
        </>
    );
}

export default Review;
