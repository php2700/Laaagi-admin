import React, { useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MDInput from "components/MDInput";
import Delete_Ads from "./delete_ads";

const getBannerDimensions = (banner) => {
    switch (banner) {
        case "Banner1":
        case "Banner2":
            return { width: 521, height: 356 };
        case "Banner3":
            return { width: 1000, height: 356 };
        default:
            return { width: 521, height: 356 };
    }
};


function Edit_Ads() {
    const location = useLocation();
    const navigate = useNavigate();
    const { adsData } = location.state || {};

    const token = localStorage.getItem("authToken");
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const [adsImage, setAdsImage] = useState(null);
    const [_id, setId] = useState();

    const [previewUrl, setPreviewUrl] = useState("");
    const [successSB, setSuccessSB] = useState(false);
    const [error, setError] = useState("");
    const [banner, setBanner] = useState("");
    const [open, setOpen] = useState(false)

    // Handle file change
    const handleChangefile = (newFile) => {
        if (newFile && newFile.type.startsWith("image/")) {

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const { width, height } = getBannerDimensions(banner);
                    if (img?.width >= width && img?.height >= height) {
                        setAdsImage(newFile);
                        setPreviewUrl(URL.createObjectURL(newFile))
                        setError("");
                    } else {
                        setError(`Small Image , Image must be ${height}x${width}px `);
                        setAdsImage(null);
                        setPreviewUrl("");
                    }
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(newFile);
        } else {
            setError("Please select a valid image file.");
            setAdsImage(null);
            setPreviewUrl("");
        }
    };

    useEffect(() => {
        setId(adsData?._id)
        setAdsImage(adsData?.image)
        setBanner(adsData.banner);
        if (adsData?.image) {
            setPreviewUrl(`${process.env.REACT_APP_BASE_URL}uploads/${adsData?.image}`);
        }
    }, [adsData]);

    const handleRemoveImage = () => {
        setOpen(true)
        // setAdsImage(null);
        // setPreviewUrl("");
    };

    const handleModelClose = () => {
        setOpen(false)
    }

    const handleConfirmRemoveImage = () => {
        setAdsImage(null);
        setPreviewUrl("");
        setOpen(false)
    }

    const handleSubmit = async () => {

        if (!adsImage) {
            setError("Please upload Image.");
            return;
        }

        const formData = new FormData();
        formData.append("_id", _id)
        if (adsImage && adsImage !== adsData?.image) {
            formData.append("image", adsImage);
        }

        try {
            const response = await axios.patch(
                `${process.env.REACT_APP_BASE_URL}api/admin/update_ads`,
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
                setAdsImage(null);
                setId("")
                navigate("/ads")
            } else {
                setError("Failed to upload the image.");
            }
        } catch (error) {
            console.error("Error uploading banner:", error);
            setError("Error uploading the image.");
        }
    };

    const { width: previewWidth, height: previewHeight } =
        getBannerDimensions(banner);
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
                                    {banner}
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={5} mx={2}>
                                <MDBox component="form" role="form" sx={{ minHeight: "60vh" }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6} xl={12} mt={1}
                                            display='flex'
                                            flexDirection='column'
                                            alignItems="center"
                                        >
                                            <MDBox mb={2}
                                                width='25%'
                                                display="flex"
                                                flexDirection="column"
                                            >
                                                <MuiFileInput
                                                    value={adsImage instanceof File ? adsImage : null}

                                                    onChange={handleChangefile}
                                                    placeholder={
                                                        !previewUrl && !adsImage
                                                            ? "Upload Ads Image"
                                                            : previewUrl
                                                                ? "Edit Ads Image"
                                                                : "Replace Image"
                                                    }
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
                                                <MDBox mt={2} sx={{ textAlign: "center" }}>
                                                    <img
                                                        src={previewUrl}
                                                        alt="Preview"
                                                        style={{
                                                            // width: "200px",
                                                            // height: "100px",
                                                            width: `${previewWidth}px`,
                                                            height: `${previewHeight}px`,
                                                            objectFit: "cover",
                                                            borderRadius: "8px",
                                                            marginTop: "8px",
                                                        }}
                                                    />
                                                    <MDBox mt={1}>
                                                        <MDTypography variant="caption" color="text">
                                                            {adsImage?.name}
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
                                            Edit
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
            <Delete_Ads
                open={open}
                handleClose={handleModelClose}
                removeImage={handleConfirmRemoveImage}
            />
        </DashboardLayout>
    );
}

export default Edit_Ads;
