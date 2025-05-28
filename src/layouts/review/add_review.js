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
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";


// Data
import { useMaterialUIController } from "context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MDInput from "components/MDInput";
import { logout } from "layouts/common";


function Add_Review() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [controller] = useMaterialUIController();
  const { sidenavColor } = controller;

  // State for image file and success message
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [name, setName] = useState(null);

  const [previewUrl, setPreviewUrl] = useState("");
  const [successSB, setSuccessSB] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({})

  const sweetsList = ["Bengali", "Kesariya", "Pethe"];
  // Handle file change
  const handleChangefile = (newFile) => {
    if (newFile && newFile.type.startsWith("image/")) {

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (img.width >= 360 && img.height >= 335) {
            setImage(newFile);
            setPreviewUrl(URL.createObjectURL(newFile))
            setError("");
          } else {
            setError("Small Image,Image must be at least 335x360 pixels.");
            setImage(null);
            setPreviewUrl("");
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(newFile);
    } else {
      setError("Please select a valid image file.");
      setImage(null);
      setPreviewUrl("");
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl("");
  };

  // Handle form submission
  const handleSubmit = async () => {
    let allError = {}

    if (!name) {
      allError.name = "Please Enter Name"
    } else if (!name?.trim()) {
      allError.name = "Please Enter Name"
    } else if (!/^[a-zA-Z\s]*$/.test(name)) {
      allError.name = "Please Enter Valid Name"
    }

    if (!description) {
      allError.description = "Please Add Description."
    } else if (!description?.trim()) {
      allError.description = "Please Enter description"
    }

    if (!designation) {
      allError.designation = "Please Enter Designation."
    } else if (!designation?.trim()) {
      allError.designation = "Please Enter designation"
    }

    if (Object?.keys(allError)?.length > 0) {
      setErrors(allError)
      if (!image) {
        setError("Please Upload Image.");
      }
      return
    }

    if (!image) {
      setError("Please Upload Image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("designation", designation);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/admin/add_review`,
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
        setImage(null);
        setName("");
        setDescription("");
        setDesignation("");
        setErrors({});
        navigate("/review")
      } else {
        setError("Failed to upload the image.");
      }
    } catch (error) {
      if (error?.response?.data?.Message === 'jwt expired') {
                logout(navigate)
            }
      console.error("Error uploading banner:", error);
      // setError("Error uploading the image.");
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
                  Add Review
                </MDTypography>
              </MDBox>
              <MDBox pt={5} mx={2}>
                <MDBox component="form" role="form" sx={{ minHeight: "60vh" }}>
                  <Grid container spacing={3}>
                    {/* <Grid item xs={12} md={6} xl={3} >
                      <MDBox mb={2} > */}
                    <Grid item xs={12} md={6} xl={4} display="flex" justifyContent="center">
                      <MDBox mb={2} width='100%' >
                        <MDInput
                          type="text"
                          label="Name"
                          fullWidth
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value)
                            setErrors((prev) => ({ ...prev, name: "" }))
                          }}
                          sx={{ marginTop: "8px" }}
                        />
                        {errors.name && (
                          <div style={{ color: "red", fontSize: "12px", fontWeight: 350, marginTop: "8px" }}>{errors.name}</div>
                        )}
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} xl={4} display="flex" justifyContent="center">
                      <MDBox mb={2} width='100%'>
                        <MDInput
                          type="text"
                          label="designation"
                          fullWidth
                          value={designation}
                          onChange={(e) => {
                            setDesignation(e.target.value)
                            setErrors((prev) => ({ ...prev, designation: "" }))
                          }
                          }
                          sx={{ marginTop: "8px" }}
                        />
                        {errors.designation && (
                          <div style={{ color: "red", fontSize: "12px", fontWeight: 350, marginTop: "8px" }}>{errors.designation}</div>
                        )}
                      </MDBox>
                    </Grid>


                    <Grid item xs={12} md={6} xl={4} mt={1}
                      display="flex"
                      flexDirection='column'
                      alignItems="center"
                    >

                      <MDBox mb={2} width='100%'
                        display="flex"
                        flexDirection="column"
                      >
                        <MuiFileInput
                          value={image}
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
                          <div style={{ color: "red", fontSize: "12px", fontWeight: 350, marginTop: "8px" }}>
                            {error}
                          </div>
                        )}
                      </MDBox>
                      {previewUrl && (
                        <MDBox mt={1}
                          sx={{ textAlign: "center" }}
                        >
                          <img
                            src={previewUrl}
                            alt="Preview"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              marginTop: "8px",
                            }}
                          />
                          <MDBox mt={1}>
                            <MDTypography variant="caption" color="text">
                              {image?.name}
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
                    </Grid>

                    <Grid item xs={12} md={6} xl={4} display="flex" justifyContent="center">
                      <MDBox mb={2} width='100%'>
                        <MDInput
                          type="text"
                          label="description"
                          fullWidth
                          multiline
                          minRows={4}
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value)
                            setErrors((prev) => ({ ...prev, description: "" }))
                          }
                          }
                          sx={{ marginTop: "8px" }}
                        />
                        {errors.description && (
                          <div style={{ color: "red", fontSize: "12px", fontWeight: 350, marginTop: "8px" }}>{errors.description}</div>
                        )}
                      </MDBox>
                    </Grid>

                  </Grid>
                  <MDBox mt={4} mb={1} sx={{ textAlign: "center" }}>
                    <MDButton variant="gradient" color="info" onClick={handleSubmit}>
                      Upload Review
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

export default Add_Review;
