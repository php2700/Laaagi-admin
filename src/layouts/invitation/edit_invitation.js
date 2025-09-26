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
import { invitationCategoryData, PriceRangeData } from "layouts/staticData/index"
import Delete_Image from "./delete_image";
import { logout } from "layouts/common";

function Edit_Invitation() {
    const location = useLocation();
    const navigate = useNavigate();
    const { invitationData } = location.state || {};

    const token = localStorage.getItem("authToken");
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    // State for image file and success message
    const [image, setImage] = useState(null);
    const [image02, setImage02] = useState(null);
    const [image03, setImage03] = useState(null);
    const [image04, setImage04] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState(null)

    const [price, setPrice] = useState();
    const [description, setDescription] = useState(null);
    const [category, setCategory] = useState(null);
    const [name, setName] = useState(null);
    const [_id, setId] = useState();

    const [previewUrl, setPreviewUrl] = useState("");
    const [previewUrl02, setPreviewUrl02] = useState("");
    const [previewUrl03, setPreviewUrl03] = useState("");
    const [previewUrl04, setPreviewUrl04] = useState("");
    const [successSB, setSuccessSB] = useState(false);
    const [error, setError] = useState("");
    const [error02, setError02] = useState("");
    const [error03, setError03] = useState("");
    const [error04, setError04] = useState("");
    const [errors, setErrors] = useState({})
    const [open, setOpen] = useState(false)
    const [videoError, setVideoError] = useState("")


    const invitationList = invitationCategoryData;
    const PriceRangeList = PriceRangeData;

    // Handle file change
    const handleChangefile = (newFile) => {
        if (newFile && newFile.type.startsWith("image/")) {

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    if (img.width >= 340 && img.height >= 220) {
                        setImage(newFile);
                        setPreviewUrl(URL.createObjectURL(newFile))
                        setError("");
                    } else {
                        setError("Small Image,Image must be at least 220x340 pixels.");
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

    const handleChangefile2 = (newFile) => {
        if (newFile && newFile.type.startsWith("image/")) {

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    if (img.width >= 340 && img.height >= 220) {
                        setImage02(newFile);
                        setPreviewUrl02(URL.createObjectURL(newFile))
                        setError02("");
                    } else {
                        setError02("Small Image,Image must be at least 220x340 pixels.");
                        setImage02(null);
                        setPreviewUrl02("");
                    }
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(newFile);
        } else {
            setError02("Please select a valid image file.");
            setImage02(null);
            setPreviewUrl02("");
        }
    };

    const handleChangefile3 = (newFile) => {
        if (newFile && newFile.type.startsWith("image/")) {

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    if (img.width >= 340 && img.height >= 220) {
                        setImage03(newFile);
                        setPreviewUrl03(URL.createObjectURL(newFile))
                        setError03("");
                    } else {
                        setError03("Small Image,Image must be at least 220x340 pixels.");
                        setImage03(null);
                        setPreviewUrl03("");
                    }
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(newFile);
        } else {
            setError03("Please select a valid image file.");
            setImage03(null);
            setPreviewUrl03("");
        }
    };

    const handleChangefile4 = (newFile) => {
        if (newFile && newFile.type.startsWith("image/")) {

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    if (img.width >= 340 && img.height >= 220) {
                        setImage04(newFile);
                        setPreviewUrl04(URL.createObjectURL(newFile))
                        setError04("");
                    } else {
                        setError04("Small Image,Image must be at least 220x340 pixels.");
                        setImage04(null);
                        setPreviewUrl04("");
                    }
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(newFile);
        } else {
            setError04("Please select a valid image file.");
            setImage04(null);
            setPreviewUrl04("");
        }
    };

 const handleVideoChange = (file) => {
    if (file) {
        if (file.type.startsWith("video/")) {
            setVideoFile(file);
            setVideoPreviewUrl(URL.createObjectURL(file));
            setVideoError("");
        } else {
            setVideoError("Please select a valid video file.");
            setVideoFile(null);
            setVideoPreviewUrl(null);
        }
    } else {
        setVideoError("No video file selected.");
        setVideoFile(null);
        setVideoPreviewUrl(null);
    }
};

    const handleRemoveVideo = () => {
        setVideoFile(null);
        setVideoPreviewUrl(null);
    };

    useEffect(() => {
        console.log(invitationData, '33333333')
        setId(invitationData?._id)
        setName(invitationData?.name)
        setDescription(invitationData?.description)
        setCategory(invitationData?.category)
        setImage(invitationData?.image)
        setImage02(invitationData?.image02)
        setImage03(invitationData?.image03)
        setImage04(invitationData?.image04)
        setVideoFile(invitationData?.videoFile)
        setPrice((invitationData?.price.toString()))
        if (invitationData?.image) {
            setPreviewUrl(`${process.env.REACT_APP_BASE_URL}uploads/${invitationData?.image}`);
            setPreviewUrl02(`${process.env.REACT_APP_BASE_URL}uploads/${invitationData?.image02}`);
            setPreviewUrl03(`${process.env.REACT_APP_BASE_URL}uploads/${invitationData?.image03}`);
            setPreviewUrl04(`${process.env.REACT_APP_BASE_URL}uploads/${invitationData?.image04}`);
            setVideoPreviewUrl(`${process.env.REACT_APP_BASE_URL}uploads/${invitationData?.videoFile}`)
        }
    }, [invitationData]);

    const handleRemoveImage = () => {
        // setOpen(true)
        setImage(null);
        setPreviewUrl("");
    };

    const handleClose = () => {
        setOpen(false)
    }

    const handleConfirmRemoveImage = () => {
        setImage(null);
        setPreviewUrl("");
        setOpen(false)
    }

    const handleRemoveImage02 = () => {
        setImage02(null);
        setPreviewUrl02("");
    };

    const handleRemoveImage03 = () => {
        setImage03(null);
        setPreviewUrl03("");
    };

    const handleRemoveImage04 = () => {
        setImage04(null);
        setPreviewUrl04("");
    };


    const handleSubmit = async () => {
    let allError = {};
    if (!price) {
        allError.price = "Please Enter Amount.";
    } else if (!/^\d*$/.test(price)) {
        allError.price = "Enter Valid Amount";
    }

    if (!name) {
        allError.name = "Please Enter Name";
    } else if (!name?.trim()) {
        allError.name = "Please Enter Name";
    } else if (!/^[a-zA-Z\s]*$/.test(name)) {
        allError.name = "Please Enter Valid Name";
    }

    if (!description) {
        allError.description = "Please Add Description.";
    } else if (!description?.trim()) {
        allError.description = "Please Enter Description";
    }

    if (!category) {
        allError.category = "Please Select Category.";
    }

    if (Object.keys(allError).length > 0) {
        setErrors(allError);
        if (!image) setError("Please upload Image.");
        if (!image02) setError02("Please upload Image.");
        if (!image03) setError03("Please upload Image.");
        if (!image04) setError04("Please upload Image.");
        if (!videoFile) setVideoError("Please upload Video.");
        return;
    }

    if (!image) {
        setError("Please upload Image.");
        return;
    }
    if (!image02) {
        setError02("Please upload Image.");
        return;
    }
    if (!image03) {
        setError03("Please upload Image.");
        return;
    }
    if (!image04) {
        setError04("Please upload Image.");
        return;
    }
    if (!videoFile) {
        setVideoError("Please upload Video.");
        return;
    }

    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    if (image instanceof File) {
        formData.append("image", image);
    }
    if (image02 instanceof File) {
        formData.append("image02", image02);
    }
    if (image03 instanceof File) {
        formData.append("image03", image03);
    }
    if (image04 instanceof File) {
        formData.append("image04", image04);
    }
    if (videoFile instanceof File) {
        formData.append("videoFile", videoFile);
    }

    try {
        const response = await axios.patch(
            `${process.env.REACT_APP_BASE_URL}api/admin/update_invitation`,
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
            setImage(null);
            setImage02(null);
            setImage03(null);
            setImage04(null);
            setVideoFile(null);
            setId("");
            setName("");
            setDescription("");
            setCategory("");
            setPrice("");
            setErrors({});
            navigate("/invitation");
        } else {
            setError("Failed to upload the invitation.");
        }
    } catch (error) {
        if (error?.response?.data?.Message === "jwt expired") {
            logout(navigate);
        }
        setError("Error uploading the invitation.");
    }
};
    console.log(category, "category")
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
                                    Edit Invitation
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={5} mx={2}>
                                <MDBox component="form" role="form" sx={{ minHeight: "60vh" }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6} xl={4} display='flex' justifyContent='center'>
                                            <MDBox mb={2} width='100%'>
                                                <FormControl fullWidth>
                                                    <InputLabel id="client-name-label" sx={{ paddingTop: "8px" }}>
                                                        Box Category
                                                    </InputLabel>
                                                    <Select
                                                        labelId="client-name-label"
                                                        value={category || ""}
                                                        onChange={(e) => {
                                                            setCategory(e.target.value)
                                                            setErrors((prev) => ({ ...prev, category: "" }));
                                                        }}
                                                        label="Client Name"
                                                        sx={{ height: "45px", marginTop: "8px" }}
                                                    >
                                                        {invitationList.map((invitation) => (
                                                            <MenuItem key={invitation} value={invitation}>
                                                                {invitation}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                {errors.category && (
                                                    <div style={{ color: "red", fontSize: "12px", fontWeight: 350, marginTop: "8px" }}>{errors.category}</div>
                                                )}
                                            </MDBox>
                                        </Grid>


                                        <Grid item xs={12} md={6} xl={4} display="flex" justifyContent="center" >
                                            <MDBox mb={2} width='100%'>
                                                <MDInput
                                                    type="text"
                                                    label="Box Name"
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
                                                    label="Price"
                                                    fullWidth
                                                    value={price}
                                                    onChange={(e) => {

                                                        setPrice(e.target.value)
                                                        setErrors((prev) => ({ ...prev, price: "" }));
                                                    }}
                                                    sx={{ marginTop: "8px" }}
                                                />
                                                {errors.price && (
                                                    <div style={{ color: "red", fontSize: "12px", fontWeight: 350, marginTop: "8px" }}>{errors.price}</div>
                                                )}
                                            </MDBox>
                                        </Grid>

                                        <Grid item xs={12} md={6} xl={4} mt={1}
                                            display='flex'
                                            flexDirection='column'
                                            alignItems="center"
                                        >
                                            <MDBox mb={2}
                                                width='100%'
                                                display="flex"
                                                flexDirection="column"
                                            >
                                                <MuiFileInput
                                                    value={image instanceof File ? image : null}

                                                    onChange={handleChangefile}
                                                    placeholder={
                                                        !previewUrl && !image
                                                            ? "Upload Image"
                                                            : previewUrl
                                                                ? "Edit Box Image"
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
                                                            width: "340px",
                                                            height: "220px",
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


                                        <Grid item xs={12} md={6} xl={4} mt={1}
                                            display='flex'
                                            flexDirection='column'
                                            alignItems="center"
                                        >
                                            <MDBox mb={2}
                                                width='100%'
                                                display="flex"
                                                flexDirection="column"
                                            >
                                                <MuiFileInput
                                                    value={image02 instanceof File ? image02 : null}

                                                    onChange={handleChangefile2}
                                                    placeholder={
                                                        !previewUrl02 && !image02
                                                            ? "Upload Image"
                                                            : previewUrl02
                                                                ? "Edit Box Image"
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
                                                {error02 && (
                                                    <div style={{ color: "red", fontSize: "12px", fontWeight: 350, marginTop: "8px" }}>
                                                        {error02}
                                                    </div>
                                                )}
                                            </MDBox>
                                            {previewUrl02 && (
                                                <MDBox mt={2} sx={{ textAlign: "center" }}>
                                                    <img
                                                        src={previewUrl02}
                                                        alt="Preview"
                                                        style={{
                                                            width: "340px",
                                                            height: "220px",
                                                            objectFit: "cover",
                                                            borderRadius: "8px",
                                                            marginTop: "8px",
                                                        }}
                                                    />
                                                    <MDBox mt={1}>
                                                        <MDTypography variant="caption" color="text">
                                                            {image02?.name}
                                                        </MDTypography>
                                                        <IconButton
                                                            onClick={handleRemoveImage02}
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

                                        <Grid item xs={12} md={6} xl={4} mt={1}
                                            display='flex'
                                            flexDirection='column'
                                            alignItems="center"
                                        >
                                            <MDBox mb={2}
                                                width='100%'
                                                display="flex"
                                                flexDirection="column"
                                            >
                                                <MuiFileInput
                                                    value={image03 instanceof File ? image03 : null}

                                                    onChange={handleChangefile3}
                                                    placeholder={
                                                        !previewUrl03 && !image03
                                                            ? "Upload Image"
                                                            : previewUrl03
                                                                ? "Edit Box Image"
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
                                                {error03 && (
                                                    <div style={{ color: "red", fontSize: "12px", fontWeight: 350, marginTop: "8px" }}>
                                                        {error03}
                                                    </div>
                                                )}
                                            </MDBox>
                                            {previewUrl03 && (
                                                <MDBox mt={2} sx={{ textAlign: "center" }}>
                                                    <img
                                                        src={previewUrl03}
                                                        alt="Preview"
                                                        style={{
                                                            width: "340px",
                                                            height: "220px",
                                                            objectFit: "cover",
                                                            borderRadius: "8px",
                                                            marginTop: "8px",
                                                        }}
                                                    />
                                                    <MDBox mt={1}>
                                                        <MDTypography variant="caption" color="text">
                                                            {image03?.name}
                                                        </MDTypography>
                                                        <IconButton
                                                            onClick={handleRemoveImage03}
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

                                        <Grid item xs={12} md={6} xl={4} mt={1}
                                            display='flex'
                                            flexDirection='column'
                                            alignItems="center"
                                        >
                                            <MDBox mb={2}
                                                width='100%'
                                                display="flex"
                                                flexDirection="column"
                                            >
                                                <MuiFileInput
                                                    value={image04 instanceof File ? image04 : null}

                                                    onChange={handleChangefile4}
                                                    placeholder={
                                                        !previewUrl04 && !image04
                                                            ? "Upload Image"
                                                            : previewUrl04
                                                                ? "Edit Box Image"
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
                                                {error04 && (
                                                    <div style={{ color: "red", fontSize: "12px", fontWeight: 350, marginTop: "8px" }}>
                                                        {error04}
                                                    </div>
                                                )}
                                            </MDBox>
                                            {previewUrl04 && (
                                                <MDBox mt={2} sx={{ textAlign: "center" }}>
                                                    <img
                                                        src={previewUrl04}
                                                        alt="Preview"
                                                        style={{
                                                            width: "340px",
                                                            height: "220px",
                                                            objectFit: "cover",
                                                            borderRadius: "8px",
                                                            marginTop: "8px",
                                                        }}
                                                    />
                                                    <MDBox mt={1}>
                                                        <MDTypography variant="caption" color="text">
                                                            {image04?.name}
                                                        </MDTypography>
                                                        <IconButton
                                                            onClick={handleRemoveImage04}
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
                                        <Grid item xs={12} md={6} xl={4} mt={1}
                                            display="flex"
                                            //  justifyContent="center"
                                            flexDirection='column'
                                            alignItems="center"
                                        >

                                            <MDBox mb={2} width='100%'
                                                display="flex"
                                                flexDirection="column"
                                            // alignItems="center" 
                                            >
                                                <MuiFileInput
                                                    value={videoFile instanceof File ? videoFile : null}

                                                    onChange={handleVideoChange}
                                                    placeholder="Upload Video"
                                                    fullWidth
                                                    inputProps={{ accept: 'video/*' }}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <AttachFileIcon sx={{ marginRight: 1, color: "#757575" }} />
                                                            </InputAdornment>
                                                        ),
                                                    }}

                                                />
                                                {videoError && (
                                                    <div style={{ color: "red", fontSize: "12px", fontWeight: 350, marginTop: "8px" }}>
                                                        {videoError}
                                                    </div>
                                                )}

                                            </MDBox>
                                            {videoPreviewUrl && (
                                                <MDBox mt={1} sx={{ textAlign: "center" }}>
                                                    <video
                                                        src={videoPreviewUrl}
                                                        controls
                                                        style={{
                                                            width: "340px",
                                                            height: "220px",
                                                            borderRadius: "8px",
                                                            marginTop: "8px",
                                                        }}
                                                    />
                                                    <MDBox mt={1}>
                                                        <MDTypography variant="caption" color="text">
                                                            {videoFile?.name}
                                                        </MDTypography>
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


                                        <Grid item xs={12} md={6} xl={4} display='flex' justifyContent='center'>
                                            <MDBox mb={2} width='100%'>
                                                <MDInput
                                                    type="text"
                                                    label="Box Description"
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
            {/* <Delete_Image
                open={open}
                handleClose={handleClose}
                removeImage={handleConfirmRemoveImage}
            /> */}
        </DashboardLayout>
    );
}

export default Edit_Invitation;
