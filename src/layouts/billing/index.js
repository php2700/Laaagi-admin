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
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";
import MDPagination from "components/MDPagination";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import { useMaterialUIController } from "context";
import EditIcon from '@mui/icons-material/Edit';


function Billing() {

  const [controller] = useMaterialUIController();
  const { sidenavColor } = controller;
  const [bannerData, setBannerData] = useState([]);
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
  const [bannerId, setBannerId] = useState();

  const token = localStorage.getItem("authToken");
  const getBannerData = async (page, search) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/admin/banner_list`,
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
      const datas = response.data.Images?.data;
      setTotal_rows(response.data.Images.total);
      setFirstpageurl(response.data.Images?.first_page_url);
      setFrom(response.data.Images?.from);
      setLastpage(response.data.Images?.last_page);
      setLastpageurl(response.data.Images?.last_page_url);
      setLinks(response.data.Images?.links);
      setNextpageurl(response.data.Images?.next_page_url);
      setPath(response.data.Images?.path);
      setPer_page(response.data.Images?.per_page);
      setPrevpageurl(response.data.Images?.prev_page_url);
      setTotal(response.data.Images?.total);
      setCurrentpage(response.data.Images?.current_page);

      const modifiedData = datas.map((user) => {
        return {
          _id: user._id,
          banner: user.banner,
          link: user?.link
        };
      });
      setBannerData(modifiedData);
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
    getBannerData(newPage, searchText);
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
    getBannerData(newPage, searchText);
  }, [newPage, searchText]);

  const handleDelete = (id) => {
    setBannerId(id)
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
                    Banners
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <MDBox mx={2} mb={2}>
                    <Link to={`/add-banner`}>
                      <MDButton
                        component="a"
                        rel="noreferrer"
                        variant="gradient"
                        color={sidenavColor}
                      >
                        Add Banner
                      </MDButton>
                    </Link>
                  </MDBox>
                  {bannerData?.length === 0 ? (
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
                              Header: "Link ",
                              accessor: "Link",
                              width: "15%",
                              align: "left",
                            },
                            { Header: "Action", accessor: "Action", align: "left" },
                          ],

                          rows: bannerData?.map((user, index) => ({
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
                                  src={`${process.env.REACT_APP_BASE_URL}uploads/${user.banner}`}
                                  alt="Banner"
                                  style={{ width: "100px", height: "100px", borderRadius: "5px" }}
                                />
                              </MDTypography>
                            ),
                            Link: (
                              <MDTypography
                                component="a"
                                variant="caption"
                                color="text"
                                fontWeight="medium"
                              >
                                {user?.link}
                              </MDTypography>
                            ),
                            Action: (
                              <Link to='/edit-banner'
                                state={{ bannerData: user }}
                              >
                                <MDTypography
                                  component="span"
                                  variant="caption"
                                  color="text"
                                  fontWeight="medium"
                                  // onClick={() => handleDelete(user._id)}

                                  sx={{
                                    cursor: "pointer",
                                    textDecoration: "none",
                                    fontSize: '18px',
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
    </>
  );
}

export default Billing;
