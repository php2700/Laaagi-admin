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
import Delete_Invitation from "./delete_Invitation";
import View_Invitation from "./view_invitation";
// import Delete_invitations from "./delete_invitations";
// import Edit_Sweets from "./edit_Sweets";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };


function Overview() {
    const navigate = useNavigate();
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;
    const [invitationData, setInvitationData] = useState([]);
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
    const [viewOpen, setViewOpen] = useState(false);

    const token = localStorage.getItem("authToken");
    const getInvitationData = async (page, search) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}api/admin/invitation_list`,
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
            const datas = response?.data?.invitationData?.data;
            setTotal_rows(response?.data?.invitationData?.total);
            setFirstpageurl(response?.data?.invitationData?.first_page_url);
            setFrom(response?.data?.invitationData?.from);
            setLastpage(response?.data?.invitationData?.last_page);
            setLastpageurl(response?.data?.invitationData?.last_page_url);
            setLinks(response?.data?.invitationData?.links);
            setNextpageurl(response?.data?.invitationData?.next_page_url);
            setPath(response?.data?.invitationData?.path);
            setPer_page(response?.data?.invitationData?.per_page);
            setPrevpageurl(response?.data?.invitationData?.prev_page_url);
            setTotal(response?.data?.invitationData?.total);
            setCurrentpage(response?.data?.invitationData?.current_page);

            const modifiedData = datas.map((invitation) => {
                return {
                    _id: invitation._id,
                    image: invitation?.image,
                    image02: invitation?.image02,
                    image03: invitation?.image03,
                    image04: invitation?.image04,
                    videoFile:invitation?.videoFile,
                    name: invitation?.name,
                    description: invitation?.description,
                    category: invitation?.category,
                    price: invitation?.price,
                    isInvitationBoxes: invitation?.isInvitationBoxes,
                    isBestSeller: invitation?.isBestSeller,
                    isDeliveryCharge: invitation?.isDeliveryCharge

                };
            });
            setInvitationData(modifiedData);
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
        getInvitationData(newPage, searchText);
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
        getInvitationData(newPage, searchText);
    }, [newPage, searchText]);

    const handleDelete = (id) => {
        setId(id)
        setOpen(true);
    }

    const handleview = (viewData) => {
        setViewData(viewData)
        setViewOpen(true)
    }

    const handleViewClose = () => {
        setViewOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const updateSwitch = async (formData) => {
        try {
            const response = await axios.patch(
                `${process.env.REACT_APP_BASE_URL}api/admin/update_invitation`,
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.status === 200) {
                ApiCall()
            }
        } catch (error) {
            console.error("Error uploading banner:", error);
        }
    }

    const handleIsBestSeller = async (invitationData) => {
        const BestSeller = invitationData.isBestSeller == true || invitationData.isBestSeller == 'true' ? 'false' : 'true'
        const formData = new FormData();
        formData.append("_id", invitationData?._id)
        formData.append("name", invitationData?.name);
        formData.append("description", invitationData?.description)
        formData.append("category", invitationData?.category);
        formData.append("price", invitationData?.price);
        formData.append("isBestSeller", BestSeller)
        updateSwitch(formData)
    }

    const handleIsDeliveryCharge = async (invitationData) => {
        const deliveryCharge = invitationData.isDeliveryCharge == true || invitationData.isDeliveryCharge == 'true' ? 'false' : 'true'
        const formData = new FormData();
        formData.append("_id", invitationData?._id)
        formData.append("isDeliveryCharge", deliveryCharge)
        updateSwitch(formData)
    }

    const handleDashboardInvitation = async (invitationData) => {
        const isInvitationBoxes = invitationData.isInvitationBoxes == true || invitationData.isInvitationBoxes == 'true' ? 'false' : 'true'

        const formData = new FormData();
        formData.append("_id", invitationData?._id)
        formData.append("name", invitationData?.name);
        formData.append("description", invitationData?.description)
        formData.append("category", invitationData?.category);
        formData.append("price", invitationData?.price);
        formData.append("isInvitationBoxes", isInvitationBoxes)
        updateSwitch(formData)
    }

console.log(invitationData,"invitation")
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
                                        Invitation
                                    </MDTypography>
                                </MDBox>
                                <MDBox pt={3}>
                                    <MDBox mx={2} mb={2}>
                                        <Link to={`/add-invitation`}>
                                            <MDButton
                                                component="a"
                                                rel="noreferrer"
                                                variant="gradient"
                                                color={sidenavColor}
                                            >
                                                Add Invitation
                                            </MDButton>
                                        </Link>
                                    </MDBox>
                                    {invitationData?.length === 0 ? (
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
                                                            Header: "Image01 ",
                                                            accessor: "Image",
                                                            width: "15%",
                                                            align: "left",
                                                        },
                                                        {
                                                            Header: "Image02 ",
                                                            accessor: "Image02",
                                                            width: "15%",
                                                            align: "left",
                                                        },
                                                        {
                                                            Header: "Image03",
                                                            accessor: "Image03",
                                                            width: "15%",
                                                            align: "left",
                                                        },
                                                        {
                                                            Header: "Image04 ",
                                                            accessor: "Image04",
                                                            width: "15%",
                                                            align: "left",
                                                        },
                                                        {
                                                            Header: "Video ",
                                                            accessor: "Video",
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
                                                            Header: "Category ",
                                                            accessor: "Category",
                                                            width: "15%",
                                                            align: "left",
                                                        },
                                                        {
                                                            Header: "Price  (INR) ",
                                                            accessor: "priceRange",
                                                            width: "15%",
                                                            align: "left",
                                                        },
                                                        {
                                                            Header: "Message",
                                                            accessor: "Description",
                                                            width: "15%",
                                                            align: "left",
                                                        },
                                                        // { Header: "DashboardInvitation", accessor: "DashboardInvitation", align: "left" },
                                                        { Header: "BestSeller", accessor: "BestSeller", align: "left" },
                                                        { Header: "DeliveryCharge", accessor: "DeliveryCharge", align: "left" },
                                                        { Header: "Edit", accessor: "Edit", align: "left" },
                                                        { Header: "Action", accessor: "Action", align: "left" },
                                                    ],

                                                    rows: invitationData.map((invitation, index) => ({
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
                                                                    src={`${process.env.REACT_APP_BASE_URL}uploads/${invitation?.image}`}
                                                                    alt="Banner"
                                                                    style={{ width: "80px", height: "80px", borderRadius: "5px" }}
                                                                />
                                                            </MDTypography>
                                                        ),
                                                        Image02: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                <img
                                                                    src={`${process.env.REACT_APP_BASE_URL}uploads/${invitation?.image02}`}
                                                                    alt="Banner"
                                                                    style={{ width: "80px", height: "80px", borderRadius: "5px" }}
                                                                />
                                                            </MDTypography>
                                                        ),
                                                        Image03: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                <img
                                                                    src={`${process.env.REACT_APP_BASE_URL}uploads/${invitation?.image03}`}
                                                                    alt="Banner"
                                                                    style={{ width: "80px", height: "80px", borderRadius: "5px" }}
                                                                />
                                                            </MDTypography>
                                                        ),
                                                        Image04: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                <img
                                                                    src={`${process.env.REACT_APP_BASE_URL}uploads/${invitation?.image04}`}
                                                                    alt="Banner"
                                                                    style={{ width: "80px", height: "80px", borderRadius: "5px" }}
                                                                />
                                                            </MDTypography>
                                                        ),
                                                        Video:(
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                               
                                                              <video
  controls muted
  style={{ width: "100px", height: "80px", borderRadius: "5px" }}
>
  <source
    src={`${process.env.REACT_APP_BASE_URL}uploads/${invitation?.videoFile}`}
    type="video/mp4"
  />
</video>

                                                            </MDTypography>
                                                        ),
                                                        Name: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {invitation?.name}
                                                            </MDTypography>
                                                        ),

                                                        Category: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {invitation?.category}
                                                            </MDTypography>
                                                        ),
                                                        priceRange: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                {invitation?.price}
                                                            </MDTypography>
                                                        ),
                                                        Description: (
                                                            // <MDTypography
                                                            //     component="a"
                                                            //     variant="caption"
                                                            //     color="text"
                                                            //     fontWeight="medium"
                                                            // >
                                                            //     {invitation?.description}
                                                            // </MDTypography>

                                                            <MDButton variant="gradient" color="info" onClick={() => { handleview(invitation?.description) }}>
                                                                view
                                                            </MDButton>
                                                        ),
                                                        // DashboardInvitation: (
                                                        //     <MDTypography
                                                        //         component="a"
                                                        //         variant="caption"
                                                        //         color="text"
                                                        //         fontWeight="medium"
                                                        //     >
                                                        //         <Switch {...label} onChange={() => handleDashboardInvitation(invitation)} checked={invitation?.isInvitationBoxes == true || invitation?.isInvitationBoxes == 'true'} />
                                                        //     </MDTypography>
                                                        // ),
                                                        BestSeller: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                <Switch {...label} onChange={() => handleIsBestSeller(invitation)} checked={invitation.isBestSeller == true || invitation.isBestSeller == 'true'} />
                                                            </MDTypography>
                                                        ),
                                                        DeliveryCharge: (
                                                            <MDTypography
                                                                component="a"
                                                                variant="caption"
                                                                color="text"
                                                                fontWeight="medium"
                                                            >
                                                                <Switch {...label} onChange={() => handleIsDeliveryCharge(invitation)} checked={invitation.isDeliveryCharge == true || invitation.isDeliveryCharge == 'true'} />
                                                            </MDTypography>
                                                        ),
                                                        Edit: (
                                                            <Link to={`/edit-invitation`}
                                                                state={{ invitationData: invitation }}
                                                            >
                                                                <MDTypography
                                                                    component="span"
                                                                    variant="caption"
                                                                    fontWeight="medium"
                                                                    // onClick={() => handleEdit(invitation)}
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
                                                                onClick={() => handleDelete(invitation._id)}
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
            <Delete_Invitation
                open={open}
                handleClose={handleClose}
                data={getInvitationData}
                id={id}
            />
            <View_Invitation
                open={viewOpen}
                handleClose={handleViewClose}
                data={viewData}
            />

        </>
    );
}

export default Overview;
