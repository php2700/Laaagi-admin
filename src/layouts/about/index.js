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

import { Card } from "@mui/material";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import MDPagination from "components/MDPagination";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import { useMaterialUIController } from "context";
import View_about from "./view_about";
// import Delete_Sweets from "./delete_sweets";
// import Edit_Sweets from "./edit_Sweets";
import EditIcon from '@mui/icons-material/Edit';


function About() {
    const navigate = useNavigate();
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;
    const [aboutData, setAboutData] = useState([]);
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
    const [viewOpen, setViewOpen] = useState(false);

    const token = localStorage.getItem("authToken");
    const getAboutData = async (page, search) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}api/admin/about_list`,
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
            const datas = response?.data?.aboutData?.data;
            setTotal_rows(response?.data?.aboutData?.total);
            setFirstpageurl(response?.data?.aboutData?.first_page_url);
            setFrom(response?.data?.aboutData?.from);
            setLastpage(response?.data?.aboutData?.last_page);
            setLastpageurl(response?.data?.aboutData?.last_page_url);
            setLinks(response?.data?.aboutData?.links);
            setNextpageurl(response?.data?.aboutData?.next_page_url);
            setPath(response?.data?.aboutData?.path);
            setPer_page(response?.data?.aboutData?.per_page);
            setPrevpageurl(response?.data?.aboutData?.prev_page_url);
            setTotal(response?.data?.aboutData?.total);
            setCurrentpage(response?.data?.aboutData?.current_page);

            const modifiedData = datas.map((about) => {
                   const newDate = new Date(about?.createdAt);
                const formatedDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart("2", '0')}-${String(newDate.getDate()).padStart("2", "0")}`
                const updatedDate = new Date(about?.updatedAt);
                const updateDate = `${updatedDate.getFullYear()}-${String(updatedDate.getMonth() + 1).padStart("2", '0')}-${String(updatedDate.getDate()).padStart("2", "0")}`

                return {
                    _id: about._id,
                    video: about?.video,
                    description: about?.description,
                         createdAt: formatedDate,
                    updatedAt: updateDate
                };
            });
            setAboutData(modifiedData);
        } catch (error) {
            console.error("Error fetching video data:", error);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setNewPage(page);
        }
    };

    const ApiCall = () => {
        getAboutData(newPage, searchText);
    };
    const totalPages = Math.ceil(total_rows / per_page);
    const maxPageNumbers = 5;
    const currentPage = current_page;
    const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);
    const pageNumbers = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
    );

    const handleView = (descriptionData) => {
        setViewData(descriptionData)
        setViewOpen(true)
    }

    const handleViewClose = () => {
        setViewOpen(false)
    }

    useEffect(() => {
        getAboutData(newPage, searchText);
    }, [newPage, searchText]);


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
                                        About Us
                                    </MDTypography>
                                </MDBox>
                                <MDBox pt={3}>
                                    {aboutData?.length === 0 ? (
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
                                                            Header: "Video ",
                                                            accessor: "Video",
                                                            width: "25%",
                                                            align: "left",
                                                        },
                                                        {
                                                            Header: "Description ",
                                                            accessor: "Description",
                                                            width: "25%",
                                                            align: "left",
                                                        },
                                                          {
                                                            Header: "Created ",
                                                            accessor: "Created",
                                                            width: "20%",
                                                            align: "left",
                                                        },
                                                        {
                                                            Header: "Updated ",
                                                            accessor: "Updated",
                                                            width: "20%",
                                                            align: "left",
                                                        },
                                                        { Header: "Edit", accessor: "Edit", align: "left" },
                                                    ],

                                                    rows: aboutData.map((about, index) => ({
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
                                                        Video: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                <video
                                                                    width="200"
                                                                    height="150"
                                                                    controls
                                                                    style={{ borderRadius: "5px" }} >
                                                                    <source
                                                                        src={`${process.env.REACT_APP_BASE_URL}uploads/${about?.video}`}
                                                                        type="video/mp4"
                                                                    />
                                                                    Your browser does not support the video tag.

                                                                </video>
                                                            </MDTypography>
                                                        ),
                                                        Description: (
                                                            // <MDTypography
                                                            //     component="a"
                                                            //     variant="caption"
                                                            //     color="text"
                                                            //     fontWeight="medium"
                                                            // >
                                                            //     {about?.description}
                                                            // </MDTypography>
                                                            <MDButton
                                                                variant="gradient" color="info"
                                                                onClick={() => { handleView(about?.description) }}
                                                            >
                                                                view
                                                            </MDButton>
                                                        ), Created: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {about?.createdAt}
                                                            </MDTypography>
                                                        ),
                                                        Updated: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {about?.updatedAt}
                                                            </MDTypography>
                                                        ),


                                                        Edit: (
                                                            <Link
                                                                to={`/edit-about`}
                                                                state={{ aboutData: about }}
                                                            >
                                                                <MDTypography
                                                                    component="span"
                                                                    variant="caption"
                                                                    fontWeight="medium"
                                                                    // onClick={() => handleEdit(sweet)}
                                                                    sx={{
                                                                        cursor: "pointer",
                                                                        textDecoration: "none",
                                                                        fontSize: '18px'
                                                                    }}
                                                                >
                                                                    <EditIcon />
                                                                </MDTypography>
                                                            </Link>
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
            <View_about
                open={viewOpen}
                handleClose={handleViewClose}
                data={viewData}
            />
        </>
    );
}

export default About;
