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
import Delete_Planning from "./delete_planning";
import View_Planning from "./view_planning";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { logout } from "layouts/common";


export const Planning_Help = () => {
    const navigate = useNavigate();
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;
    const [planningData, setPlanningData] = useState([]);
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
    const [editSweetData, setEditSweetData] = useState();
    const [editModelOpen, setEditModelOpen] = useState(false);
    const [planningOpen, setPlanningOpen] = useState(false)
    const [viewData, setViewData] = useState();

    const token = localStorage.getItem("authToken");
    const getPlannigData = async (page, search) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}api/admin/planning-help-req`,
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
            const datas = response?.data?.planningHelpReqData?.data;
            console.log(datas, "ghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
            setTotal_rows(response?.data?.planningHelpReqData?.total);
            setFirstpageurl(response?.data?.planningHelpReqData?.first_page_url);
            setFrom(response?.data?.planningHelpReqData?.from);
            setLastpage(response?.data?.planningHelpReqData?.last_page);
            setLastpageurl(response?.data?.planningHelpReqData?.last_page_url);
            setLinks(response?.data?.planningHelpReqData?.links);
            setNextpageurl(response?.data?.planningHelpReqData?.next_page_url);
            setPath(response?.data?.planningHelpReqData?.path);
            setPer_page(response?.data?.planningHelpReqData?.per_page);
            setPrevpageurl(response?.data?.planningHelpReqData?.prev_page_url);
            setTotal(response?.data?.planningHelpReqData?.total);
            setCurrentpage(response?.data?.planningHelpReqData?.current_page);

            const modifiedData = datas.map((planning) => {

                const newDate = new Date(planning?.createdAt);
                const formatedDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart("2", '0')}-${String(newDate.getDate()).padStart("2", "0")}`
                const updatedDate = new Date(planning?.updatedAt);
                const updateDate = `${updatedDate.getFullYear()}-${String(updatedDate.getMonth() + 1).padStart("2", '0')}-${String(updatedDate.getDate()).padStart("2", "0")}`

                return {
                    name: planning?.userId?.name,
                    mobile: planning?.userId?.mobile,
                    category: planning?.planningId?.category,
                    createdAt: formatedDate,
                    updatedAt: updateDate

                };
            });
            setPlanningData(modifiedData);
        } catch (error) {
            if (error?.response?.data?.Message === 'jwt expired') {
                logout(navigate)
            }
            console.error("Error fetching planning data:", error);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setNewPage(page);
        }
    };

    const ApiCall = () => {
        getPlannigData(newPage, searchText);
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
        getPlannigData(newPage, searchText);
    }, [newPage, searchText]);

    const handleDelete = (id) => {
        setId(id)
        setOpen(true);
    }


    const handleClose = () => {
        setOpen(false);
    };

    const handleview = (description) => {
        setPlanningOpen(true)
        setViewData(description);
    }

    const handleViewClose = () => {
        setPlanningOpen(false)
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
                                        Planning
                                    </MDTypography>
                                </MDBox>
                                <MDBox pt={3}>
                                    {planningData?.length === 0 ? (
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
                                                            Header: "Name ",
                                                            accessor: "Name",
                                                            width: "20%",
                                                            align: "left",
                                                        },
                                                        {
                                                            Header: "Category ",
                                                            accessor: "Category",
                                                            width: "20%",
                                                            align: "left",
                                                        },
                                                        {
                                                            Header: "Mobile ",
                                                            accessor: "Mobile",
                                                            width: "20%",
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
                                                    ],

                                                    rows: planningData.map((planning, index) => ({
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
                                                        Name: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {planning?.name}
                                                            </MDTypography>
                                                        ),
                                                        Category: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {planning?.category}
                                                            </MDTypography>
                                                        ),
                                                        Mobile: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {planning?.mobile}
                                                            </MDTypography>
                                                        ),

                                                        Created: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {planning?.createdAt}
                                                            </MDTypography>
                                                        ),
                                                        Updated: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {planning?.updatedAt}
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

            <Delete_Planning
                open={open}
                handleClose={handleClose}
                data={getPlannigData}
                id={id}
            />
            <View_Planning open={planningOpen}
                handleClose={handleViewClose}
                data={viewData}
            />
        </>
    );
}

