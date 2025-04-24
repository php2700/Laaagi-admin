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
import { decorartionData } from "layouts/staticData/index";


function Add_Decoration() {
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    // State for image file and success message
    const [decorationImage, setDecoationImage] = useState(null);
    const [category, setCategory] = useState(null);

    const [previewUrl, setPreviewUrl] = useState("");
    const [successSB, setSuccessSB] = useState(false);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({})

    const decorationList = decorartionData;

    const handleChangefile = (newFile) => {
        if (newFile && newFile.type.startsWith("image/")) {

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    if (img.width >= 390 && img.height >= 330) {
                        setDecoationImage(newFile);
                        setPreviewUrl(URL.createObjectURL(newFile))
                        setError("");
                    } else {
                        setError("Small Image,Image must be at least 450x390 pixels.");
                        setDecoationImage(null);
                        setPreviewUrl("");
                    }
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(newFile);
        } else {
            setError("Please select a valid image file.");
            setDecoationImage(null);
            setPreviewUrl("");
        }
    };

    const handleRemoveImage = () => {
        setDecoationImage(null);
        setPreviewUrl("");
    };

    // Handle form submission
    const handleSubmit = async () => {
        let allError = {}

        if (!category) {
            allError.category = "Please Select Category."
            // setErrors(allError);
            // return;
        }

        if (Object?.keys(allError)?.length > 0) {
            setErrors(allError)
            if (!decorationImage) {
                setError("Please upload Image.");
            }
            return
        }

        if (!decorationImage) {
            setError("Please upload Image.");
            return;
        }

        const formData = new FormData();
        formData.append("image", decorationImage);
        formData.append("category", category);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}api/admin/add_decoration`,
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
                setDecoationImage(null);
                setCategory("");
                setErrors({});
                navigate("/decoration")
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
                                    Add Decoration
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={5} mx={2}>
                                <MDBox component="form" role="form" sx={{ minHeight: "60vh" }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6} xl={12} display="flex" justifyContent="center">
                                            <MDBox mb={2} width='25%'>
                                                <FormControl fullWidth>
                                                    <InputLabel id="client-name-label" sx={{ paddingTop: "8px", paddingBottom: "3px" }}>
                                                        Category
                                                    </InputLabel>
                                                    <Select
                                                        labelId="client-name-label"
                                                        value={category}
                                                        onChange={(e) => {
                                                            setCategory(e.target.value)
                                                            setErrors((prev) => ({ ...prev, category: "" }));
                                                        }}
                                                        label="Client Name"
                                                        sx={{ height: "45px", marginTop: "8px" }}
                                                    >
                                                        {decorationList.map((sweets) => (
                                                            <MenuItem key={sweets} value={sweets}>
                                                                {sweets}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                {errors.category && (
                                                    <div style={{ color: "red", fontSize: "12px", fontWeight: 350, marginTop: "8px" }}>{errors.category}</div>
                                                )}
                                            </MDBox>
                                        </Grid>
                                        {/* <Grid item xs={12} md={6} xl={3} mt={1} > */}
                                        <Grid item xs={12} md={6} xl={12} mt={1}
                                            display="flex"
                                            //  justifyContent="center"
                                            flexDirection='column'
                                            alignItems="center"
                                        >

                                            <MDBox mb={2} width='25%'
                                                display="flex"
                                                flexDirection="column"
                                            // alignItems="center" 
                                            >
                                                <MuiFileInput
                                                    value={decorationImage}
                                                    onChange={handleChangefile}
                                                    placeholder="Upload Decoration Image"
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
                                                            width: "390px",
                                                            height: "330px",
                                                            objectFit: "cover",
                                                            borderRadius: "8px",
                                                            marginTop: "8px",
                                                        }}
                                                    />
                                                    <MDBox mt={1}>
                                                        <MDTypography variant="caption" color="text">
                                                            {decorationImage?.name}
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

                                    </Grid>
                                    <MDBox mt={4} mb={1} sx={{ textAlign: "center" }}>
                                        <MDButton variant="gradient" color="info" onClick={handleSubmit}>
                                            Upload Decoration
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

export default Add_Decoration;
