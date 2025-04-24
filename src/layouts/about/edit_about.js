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
import { useMaterialUIController } from "context";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MDInput from "components/MDInput";
import Delete_About from "./delete_about";

function Edit_About() {
    const location = useLocation();
    const navigate = useNavigate();
    const { aboutData } = location.state || {};

    const token = localStorage.getItem("authToken");
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    // State variables
    const [aboutVideo, setAboutVideo] = useState(null);
    const [description, setDescription] = useState("");
    const [_id, setId] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const [successSB, setSuccessSB] = useState(false);
    const [modelOpen, setModelOpen] = useState(false);

    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});


    // Validate and handle file change for video
    const handleChangefile = (newFile) => {
        if (newFile && newFile.type.startsWith("video/")) {
            // Check video size (optional)
            const maxSize = 10 * 1024 * 1024;
            if (newFile.size > maxSize) {
                setError("Video size must be less than 10 MB.");
                setAboutVideo(null);
                setPreviewUrl("");
                return;
            }

            // Show video preview
            setAboutVideo(newFile);
            setPreviewUrl(URL.createObjectURL(newFile));
            setError("");
        } else {
            setError("Please select a valid video file (MP4, WebM, Ogg).");
            setAboutVideo(null);
            setPreviewUrl("");
        }
    };

    // Load data from aboutData when page loads
    useEffect(() => {
        setId(aboutData?._id || "");
        setDescription(aboutData?.description || "");
        setAboutVideo((aboutData?.video || ""))
        if (aboutData?.video) {
            setPreviewUrl(`${process.env.REACT_APP_BASE_URL}uploads/${aboutData?.video}`);
        }
    }, [aboutData]);

    const handleRemoveVideo = () => {
        setModelOpen(true)

        // setAboutVideo(null);
        // setPreviewUrl("");
    };

    const handleRemoveModelClose = () => {
        setModelOpen(false)
    }

    const confirmRemoveVideo = () => {
        setAboutVideo(null);
        setPreviewUrl("");
        setModelOpen(false)
    }

    const handleSubmit = async () => {
        let allError = {};

        if (!description) {
            allError.description = "Please Enter Description.";
        }



        if (Object.keys(allError)?.length > 0) {
            setErrors(allError);
            if (!aboutVideo) {
                setError("Please Upload Video");
            }
            return;
        }

        if (!aboutVideo) {
            setError("Please Upload Video");
            return;
        }

        const formData = new FormData();
        formData.append("_id", _id);
        formData.append("description", description);

        // Append video only if it's a new file
        if (aboutVideo instanceof File) {
            formData.append("video", aboutVideo);
        }

        try {
            const response = await axios.patch(
                `${process.env.REACT_APP_BASE_URL}api/admin/update_about`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                setSuccessSB(true);
                // setTimeout(() => {
                navigate("/about"); // Redirect after success
                // }, 1000);
            } else {
                setError("Failed to update the video and description.");
            }
        } catch (error) {
            console.error("Error updating data:", error);
            setError("Error updating the video and description.");
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
                                    Edit About
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={5} mx={2}>
                                <MDBox component="form" role="form" sx={{ minHeight: "60vh" }}>
                                    <Grid container spacing={3}>
                                        {/* Description Input */}
                                        <Grid item xs={12} md={6} xl={12} display="flex" justifyContent="center">
                                            <MDBox mb={2} width="25%">
                                                <MDInput
                                                    type="text"
                                                    label="Description"
                                                    fullWidth
                                                    multiline
                                                    minRows={4}
                                                    value={description || ""}
                                                    onChange={(e) => {
                                                        setDescription(e.target.value);
                                                        setErrors((prev) => ({ ...prev, description: "" }));
                                                    }}
                                                    sx={{ marginTop: "8px" }}
                                                />
                                                {errors.description && (
                                                    <div
                                                        style={{
                                                            color: "red",
                                                            fontSize: "12px",
                                                            fontWeight: 350,
                                                            marginTop: "8px",
                                                        }}
                                                    >
                                                        {errors.description}
                                                    </div>
                                                )}
                                            </MDBox>
                                        </Grid>

                                        {/* File Upload (Video Only) */}
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            xl={12}
                                            mt={1}
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                        >
                                            <MDBox mb={2} width="25%" display="flex" flexDirection="column">
                                                <MuiFileInput
                                                    value={aboutVideo instanceof File ? aboutVideo : null}
                                                    onChange={handleChangefile}
                                                    placeholder={
                                                        !previewUrl && !aboutVideo
                                                            ? "Upload Video"
                                                            : previewUrl
                                                                ? "Edit Video"
                                                                : "Replace Video"
                                                    }
                                                    fullWidth
                                                    inputProps={{
                                                        accept: "video/*",
                                                    }}
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
                                            </MDBox>

                                            {/* Video Preview */}
                                            {previewUrl && (
                                                <MDBox mt={2} sx={{ textAlign: "center" }}>
                                                    <video
                                                        src={previewUrl}
                                                        controls
                                                        style={{
                                                            width: "250px",
                                                            height: "170px",
                                                            objectFit: "cover",
                                                            borderRadius: "8px",
                                                            marginTop: "8px",
                                                        }}
                                                    />
                                                    <MDBox mt={1}>
                                                        <IconButton
                                                            onClick={handleRemoveVideo}
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

                                    {/* Submit Button */}
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
                title="About Section Updated"
                content="Video and description updated successfully!"
                dateTime="0 sec ago"
                open={successSB}
                onClose={() => setSuccessSB(false)}
                close={() => setSuccessSB(false)}
                bgWhite
            />
            <Delete_About
                open={modelOpen}
                handleClose={handleRemoveModelClose}
                removeVideo={confirmRemoveVideo}
            />
        </DashboardLayout>
    );
}

export default Edit_About;
