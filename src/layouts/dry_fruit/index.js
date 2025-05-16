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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


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
import Delete_Dry_fruit from "./delete_dry_fruit";
import View_Dry_fruit_desc from "./view_desc";


function DryFruit() {
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;
    const [dryFruitData, setDryFruitData] = useState([]);
    const [dryFruitOpen, setDryFruitOpen] = useState(false)
    const [viewData, setViewData] = useState();

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
    const getDryFruitData = async (page, search) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}api/admin/dry_fruit_list`,
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
            const datas = response?.data?.dryFruitData?.data;
            setTotal_rows(response?.data?.dryFruitData?.total);
            setFirstpageurl(response?.data?.dryFruitData?.first_page_url);
            setFrom(response?.data?.dryFruitData?.from);
            setLastpage(response?.data?.dryFruitData?.last_page);
            setLastpageurl(response?.data?.dryFruitData?.last_page_url);
            setLinks(response?.data?.dryFruitData?.links);
            setNextpageurl(response?.data?.dryFruitData?.next_page_url);
            setPath(response?.data?.dryFruitData?.path);
            setPer_page(response?.data?.dryFruitData?.per_page);
            setPrevpageurl(response?.data?.dryFruitData?.prev_page_url);
            setTotal(response?.data?.dryFruitData?.total);
            setCurrentpage(response?.data?.dryFruitData?.current_page);

            const modifiedData = datas.map((dryFruit) => {
                const newDate = new Date(dryFruit?.createdAt);
                const formatedDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart("2", '0')}-${String(newDate.getDate()).padStart("2", "0")}`
                const updatedDate = new Date(dryFruit?.updatedAt);
                const updateDate = `${updatedDate.getFullYear()}-${String(updatedDate.getMonth() + 1).padStart("2", '0')}-${String(updatedDate.getDate()).padStart("2", "0")}`

                return {
                    _id: dryFruit._id,
                    image: dryFruit?.image,
                    name: dryFruit?.name,
                    amount: dryFruit?.amount,
                    description: dryFruit?.description,
                    createdAt: formatedDate,
                    updatedAt: updateDate

                };
            });
            setDryFruitData(modifiedData);
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
        getDryFruitData(newPage, searchText);
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
        getDryFruitData(newPage, searchText);
    }, [newPage, searchText]);

    const handleDelete = (id) => {
        setId(id)
        setOpen(true);
    }


    const handleClose = () => {
        setOpen(false);
    };

    const handleview = (description) => {
        setDryFruitOpen(true)
        setViewData(description);
    }

    const handleViewClose = () => {
        setDryFruitOpen(false)
    }

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
                                        Dry Fruit Treats
                                    </MDTypography>
                                </MDBox>
                                <MDBox pt={3}>
                                    <MDBox mx={2} mb={2}>
                                        <Link to={`/add-dry-fruit`}>
                                            <MDButton
                                                component="a"
                                                rel="noreferrer"
                                                variant="gradient"
                                                color={sidenavColor}
                                            >
                                                Add Dry Fruits Treats
                                            </MDButton>
                                        </Link>
                                    </MDBox>
                                    {dryFruitData?.length === 0 ? (
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
                                                            Header: "Amount ",
                                                            accessor: "Amount",
                                                            width: "15%",
                                                            align: "left",
                                                        },
                                                        {
                                                            Header: "Description ",
                                                            accessor: "Description",
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
                                                            Header: "Updated ",
                                                            accessor: "Updated",
                                                            width: "20%",
                                                            align: "left",
                                                        },
                                                        { Header: "Edit", accessor: "Edit", align: "left" },

                                                        { Header: "Action", accessor: "Action", align: "left" },
                                                    ],

                                                    rows: dryFruitData.map((wedding, index) => ({
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
                                                                    src={`${process.env.REACT_APP_BASE_URL}uploads/${wedding?.image}`}
                                                                    alt="Wedding"
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
                                                                {wedding?.name}
                                                            </MDTypography>
                                                        ),
                                                        Amount: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {wedding?.amount}
                                                            </MDTypography>
                                                        ),

                                                        Description: (
                                                            <MDButton variant="gradient" color="info" onClick={() => { handleview(wedding?.description) }}>
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
                                                                {wedding?.createdAt}
                                                            </MDTypography>
                                                        ),
                                                        Updated: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {wedding?.updatedAt}
                                                            </MDTypography>
                                                        ),
                                                        Edit: (
                                                            <Link to={`/edit-dry-fruit`}
                                                                state={{ dryFruitData: wedding }}
                                                            >
                                                                <MDTypography
                                                                    component="span"
                                                                    variant="caption"
                                                                    fontWeight="medium"
                                                                    // onClick={() => handleEdit(review)}
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
                                                        Action: (
                                                            <MDTypography
                                                                component="span"
                                                                variant="caption"
                                                                color="error"
                                                                fontWeight="medium"
                                                                onClick={() => handleDelete(wedding._id)}
                                                                sx={{
                                                                    cursor: "pointer",
                                                                    textDecoration: "none",
                                                                    fontSize: '18px'
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
            <Delete_Dry_fruit
                open={open}
                handleClose={handleClose}
                data={getDryFruitData}
                id={id}
            />
            <View_Dry_fruit_desc open={dryFruitOpen}
                handleClose={handleViewClose}
                data={viewData}
            />
        </>
    );
}

export default DryFruit;
