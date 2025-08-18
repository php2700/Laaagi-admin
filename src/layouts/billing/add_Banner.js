import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import { MuiFileInput } from "mui-file-input";
import AttachFileIcon from "@mui/icons-material/AttachFile";

// Data
import { useMaterialUIController } from "context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MDInput from "components/MDInput";


function Add_Banner() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [controller] = useMaterialUIController();
  const { sidenavColor } = controller;
  const [link, setLink] = useState();
  const [errorLink, setErrorLink] = useState()

  // State for image file and success message
  const [bannerImage, setBannerImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [successSB, setSuccessSB] = useState(false);
  const [error, setError] = useState("");

  // Handle file change
  const handleChangefile = (newFile) => {
    if (newFile && newFile.type.startsWith("image/")) {

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (img.width >= 1300 && img.height >= 450) {
            setBannerImage(newFile);
            setPreviewUrl(URL.createObjectURL(newFile))
            setError("");
          } else {
            setError("Small Image,Image must be at least 1300x450 pixels.");
            setBannerImage(null);
            setPreviewUrl("");
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(newFile);
    } else {
      setError("Please select a valid image file.");
      setBannerImage(null);
      setPreviewUrl("");
    }
  };

  const handleRemoveImage = () => {
    setBannerImage(null);
    setPreviewUrl("");
  };

  // Handle form submission
  const handleSubmit = async () => {

    if (!link && !bannerImage) {
      setErrorLink("please add Link")
      setError("Please upload an image.");
      return
    }
    if (!link) {
      setErrorLink("please add Link")
      return
    }
    if (!bannerImage) {
      setError("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("banner", bannerImage);
    formData.append("link", link)

    console.log(formData, "11111111111");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/admin/add_imageAdmin`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setSuccessSB(true);
        setLink("")
        setBannerImage(null);
        navigate("/banners")
      } else {
        setError("Failed to upload the image.");
      }
    } catch (error) {
      console.error("Error uploading banner:", error);
      setError("Error uploading the image.");
    }
  };

  return (
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
                  Add Banner Image
                </MDTypography>
              </MDBox>
              <MDBox pt={5} mx={2}>
                <MDBox component="form" role="form" sx={{ minHeight: "50vh" }}>
                  <Grid container spacing={3}>
                    {/* <Grid item xs={12} md={6} xl={3}>
                      <MDBox mb={2}>
                        <MuiFileInput
                          value={bannerImage}
                          onChange={handleChangefile}
                          placeholder="Upload Image"
                          fullWidth
                          minHeight={'450px'}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AttachFileIcon sx={{ marginRight: 1, color: "#757575" }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        {error && (
                          <div style={{ color: "red", fontSize: "12px",fontWeight: 350, marginTop: "8px" }}>
                            {error}
                          </div>
                        )}
                      </MDBox>
                      {previewUrl && (
                        <MDBox mt={2} sx={{ textAlign: "center" }}>
                          <img
                            src={previewUrl}
                            alt="Preview"
                            style={{
                              width: "78vw",
                              height: "460px",
                              objectFit: "contain",
                              borderRadius: "8px",
                              marginTop: "8px",
                            }}
                          />
                          <MDBox mt={1}>
                            <MDTypography variant="caption" color="text">
                              {bannerImage?.name}
                            </MDTypography>
                            <IconButton
                              onClick={handleRemoveImage}
                              color="error"
                              size="small"
                              sx={{ ml: 1 }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </MDBox>
                        </MDBox>
                      )}
                    </Grid> */}
                    <Grid item
                      xs={12}
                      display="flex"
                      justifyContent="center"
                      alignItems="center">
                      <MDBox mb={2}
                        width="25%"
                        display="flex"
                        flexDirection="column" >
                        <MDInput
                          type="text"
                          label="Add Link"
                          fullWidth
                          value={link}
                          onChange={(e) => {
                            setLink(e.target.value)
                            setErrorLink('')
                          }}
                          sx={{ marginTop: "8px" }}
                        />
                        {errorLink && (
                          <div style={{ color: "red", fontSize: "12px", fontWeight: 350, marginTop: "8px" }}>{errorLink}</div>
                        )}
                      </MDBox>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <MDBox
                        mb={2}
                        width="25%"
                        display="flex"
                        flexDirection="column"
                      >
                        {/* File Input Field */}
                        <MuiFileInput
                          value={bannerImage}
                          onChange={handleChangefile}
                          placeholder="Upload Banner Image"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AttachFileIcon sx={{ marginRight: 1, color: "#757575" }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        {error && (
                          <div
                            style={{
                              color: "red",
                              fontSize: "12px",
                              fontWeight: 350,
                              marginTop: "8px",
                            }}
                          >
                            {error}
                          </div>
                        )}

                        {/* Preview Section */}
                        {previewUrl && (
                          <MDBox
                            mt={2}
                            width="100%"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                          >
                            <img
                              src={previewUrl}
                              alt="Preview"
                              style={{
                                width: "1100px",
                                height: "460px",
                                // width:"1100px",
                                // objectFit: "cover",
                                objectFit: "contain",
                                borderRadius: "8px",
                                marginTop: "8px",
                              }}
                            />
                            <MDBox
                              mt={1}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <MDTypography variant="caption" color="text">
                                {bannerImage?.name}
                              </MDTypography>
                              <IconButton
                                onClick={handleRemoveImage}
                                color="error"
                                size="small"
                                sx={{ ml: 1 }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </MDBox>
                          </MDBox>
                        )}
                      </MDBox>
                    </Grid>

                  </Grid>
                  <MDBox mt={4} mb={1} sx={{ textAlign: "center" }}>
                    <MDButton variant="gradient" color="info" onClick={handleSubmit}>
                      Upload Banner
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* Success Snackbar */}
      <MDSnackbar
        color="success"
        icon="check"
        title="Banner Upload"
        content="Banner uploaded successfully!"
        dateTime="0 Sec ago"
        open={successSB}
        onClose={() => setSuccessSB(false)}
        close={() => setSuccessSB(false)}
        bgWhite
      />
    </DashboardLayout>
  );
}

export default Add_Banner;
