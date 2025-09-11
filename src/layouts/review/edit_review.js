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
import Delete_Image from "./delete_image";
import { logout } from "layouts/common";


function Edit_Review() {
    const location = useLocation();
    const navigate = useNavigate();
    const { reviewData } = location.state || {};

    const token = localStorage.getItem("authToken");
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    // State for image file and success message
    const [image, setImage] = useState(null);
    const [address, setAddress] = useState(null);
    const [description, setDescription] = useState(null);
    const [rating, setRating] = useState();
    const [name, setName] = useState(null);
    const [_id, setId] = useState();

    const [previewUrl, setPreviewUrl] = useState("");
    const [successSB, setSuccessSB] = useState(false);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({})
    const [open, setOpen] = useState(false)

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

    useEffect(() => {
        setId(reviewData?._id)
        setName(reviewData?.name)
        setAddress(reviewData?.location)
        setDescription(reviewData?.description)
        setRating(reviewData?.rating)
        // setImage(reviewData?.image)
        // if (reviewData?.image) {
        //     setPreviewUrl(`${process.env.REACT_APP_BASE_URL}uploads/${reviewData?.image}`);
        // }
    }, [reviewData]);

    const handleRemoveImage = () => {
        setOpen(true)
        // setImage(null);
        // setPreviewUrl("");
    };

    const handleClose = () => {
        setOpen(false)
    }

    const handleConfrimRemoveImage = () => {
        setImage(null);
        setPreviewUrl("");
        setOpen(false)
    }

    const handleSubmit = async () => {
        let allError = {}

        if (!name) {
            allError.name = "Please Enter Name"
        } else if (!name?.trim()) {
            allError.name = "Please Enter Name"
        } else if (!/^[a-zA-Z\s]*$/.test(name)) {
            allError.name = "Please Enter Valid Name"
        }


        if (!address) {
            allError.address = "Please Add address."
        } else if (!address?.trim()) {
            allError.address = "Please Enter address"
        }

        if (!description) {
            allError.description = "Please Enter Description."
        } else if (!description?.trim()) {
            allError.description = "Please Enter description"
        }

        if (!rating) {
            allError.rating = "Please Enter Rating"
        }

        // if (Object?.keys(allError)?.length > 0) {
        //     setErrors(allError)
        //     if (!image) {
        //         setError("Please Upload Image.");
        //     }
        //     return
        // }

        // if (!image) {
        //     setError("Please upload Image.");
        //     return;
        // }
        const updateReview = {
            "_id": _id,
            "name": name,
            "location": address,
            "description": description,
            "rating": rating
        }

        try {
            const response = await axios.patch(
                `${process.env.REACT_APP_BASE_URL}api/admin/update_review`,
                updateReview,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                setSuccessSB(true);
                setImage(null);
                setId("")
                setName("");
                setAddress("");
                setDescription("");
                setRating("")
                setErrors({});
                navigate("/review")
            } else {
                setError("Failed to upload the image.");
            }
        } catch (error) {
            console.error("Error uploading banner:", error);
            if (error?.response?.data?.Message === 'jwt expired') {
                logout(navigate)
            }
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
                                    Edit Review
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={5} mx={2}>
                                <MDBox component="form" role="form" sx={{ minHeight: "60vh" }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6} xl={4} display="flex" justifyContent="center" >
                                            <MDBox mb={2} width='100%'>
                                                <MDInput
                                                    type="text"
                                                    label="Name"
                                                    fullWidth
                                                    value={name || ""}
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
                                        <Grid item xs={12} md={6} xl={4} display='flex' justifyContent='center'>
                                            <MDBox mb={2} width='100%'>
                                                <MDInput
                                                    type="text"
                                                    label="location"
                                                    fullWidth
                                                    value={address || ""}
                                                    onChange={(e) => {
                                                        setAddress(e.target.value)
                                                        setErrors((prev) => ({ ...prev, address: "" }))
                                                    }
                                                    }
                                                    sx={{ marginTop: "8px" }}
                                                />
                                                {errors.address && (
                                                    <div style={{ color: "red", fontSize: "12px", fontWeight: 350, marginTop: "8px" }}>{errors.address}</div>
                                                )}
                                            </MDBox>
                                        </Grid>
                                        <Grid item xs={12} md={6} xl={4} display='flex' justifyContent='center'>
                                            <MDBox mb={2} width='100%'>
                                                <MDInput
                                                    type="text"
                                                    label="rating max 5"
                                                    fullWidth
                                                    value={rating || ""}
                                                    onChange={(e) => {
                                                        const rate = e.target.value;
                                                        if (rate < 6) {
                                                            setRating(rate)
                                                            setErrors((prev) => ({ ...prev, rating: "" }))
                                                        }
                                                    }
                                                    }
                                                    sx={{ marginTop: "8px" }}
                                                />
                                                {errors.rating && (
                                                    <div style={{ color: "red", fontSize: "12px", fontWeight: 350, marginTop: "8px" }}>{errors.rating}</div>
                                                )}
                                            </MDBox>
                                        </Grid>

                                        <Grid item xs={12} md={6} xl={4} display='flex' justifyContent='center'>
                                            <MDBox mb={2} width='100%'>
                                                <MDInput
                                                    type="text"
                                                    label="description"
                                                    fullWidth
                                                    multiline
                                                    minRows={4}
                                                    value={description || ""}
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
            <Delete_Image
                open={open}
                handleClose={handleClose}
                removeImage={handleConfrimRemoveImage}
            />
        </DashboardLayout>
    );
}

export default Edit_Review;
