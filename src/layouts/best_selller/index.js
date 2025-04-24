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


import { Card } from "@mui/material";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";
import MDPagination from "components/MDPagination";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import { useMaterialUIController } from "context";
import Delete_Best_Seller from "./delete_best_seller";
import DeleteIcon from '@mui/icons-material/Delete';

function Best_seller() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;
    const [bestSellerData, setBestSellerData] = useState([]);

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

    const [per_page, setPer_page] = useState(10);
    const [current_page, setCurrentpage] = useState("");
    const [open, setOpen] = useState(false);
    const [id, setId] = useState();

    const token = localStorage.getItem("authToken");
    const getBestSellerData = async (page, search) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}api/admin/best_seller_list`,
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
            const datas = response?.data?.bestSellerData?.data;
            setTotal_rows(response?.data?.bestSellerData?.total);
            setFirstpageurl(response?.data?.bestSellerData?.first_page_url);
            setFrom(response?.data?.bestSellerData?.from);
            setLastpage(response?.data?.bestSellerData?.last_page);
            setLastpageurl(response?.data?.bestSellerData?.last_page_url);
            setLinks(response?.data?.bestSellerData?.links);
            setNextpageurl(response?.data?.bestSellerData?.next_page_url);
            setPath(response?.data?.bestSellerData?.path);
            setPer_page(response?.data?.bestSellerData?.per_page);
            setPrevpageurl(response?.data?.bestSellerData?.prev_page_url);
            setTotal(response?.data?.bestSellerData?.total);
            setCurrentpage(response?.data?.bestSellerData?.current_page);

            const modifiedData = datas.map((bestSeller) => {
                return {
                    _id: bestSeller._id,
                    image: bestSeller?.image,
                    name: bestSeller?.name,
                };
            });
            setBestSellerData(modifiedData);
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
        getBestSellerData(newPage, searchText);
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
        getBestSellerData(newPage, searchText);
    }, [newPage, searchText]);

    const handleDelete = (id) => {
        setId(id)
        setOpen(true);
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
                                        Best Seller
                                    </MDTypography>
                                </MDBox>
                                <MDBox pt={3}>
                                    <MDBox mx={2} mb={2}>
                                        <Link to={`/add-best-seller`}>
                                            <MDButton
                                                component="a"
                                                rel="noreferrer"
                                                variant="gradient"
                                                color={sidenavColor}
                                            >
                                                Add Best Seller
                                            </MDButton>
                                        </Link>
                                    </MDBox>
                                    {bestSellerData?.length === 0 ? (
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
                                                        { Header: "Action", accessor: "Action", align: "left" },
                                                    ],

                                                    rows: bestSellerData.map((bestSeller, index) => ({
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
                                                                    src={`${process.env.REACT_APP_BASE_URL}uploads/${bestSeller?.image}`}
                                                                    alt="bestSeller"
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
                                                                {bestSeller?.name}
                                                            </MDTypography>
                                                        ),
                                                        Action: (
                                                            <MDTypography
                                                                component="span"
                                                                variant="caption"
                                                                color="error"
                                                                fontWeight="medium"
                                                                onClick={() => handleDelete(bestSeller._id)}
                                                                sx={{
                                                                    cursor: "pointer",
                                                                    textDecoration: "none",
                                                                    fontSize:'18px'
                                                                }}
                                                            >
                                                               <DeleteIcon/>
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
            <Delete_Best_Seller
                open={open}
                handleClose={handleClose}
                data={getBestSellerData}
                id={id}
            />
        </>
    );
}

export default Best_seller;
