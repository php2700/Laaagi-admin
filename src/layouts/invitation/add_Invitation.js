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
import { invitationCategoryData, PriceRangeData } from "layouts/staticData/index"
// Data
import { useMaterialUIController } from "context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MDInput from "components/MDInput";
import { logout } from "layouts/common";


function Add_Invitation() {
    const navigate = useNavigate();
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
    const [description, setDescription] = useState(null);
    const [category, setCategory] = useState(null);
    const [name, setName] = useState(null);
    const [price, setPrice] = useState();
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
    const [videoError, setVideoError] = useState("")

    const invitationCategory = invitationCategoryData;
    const PriceRangeList = PriceRangeData
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
        if (file && file.type.startsWith("video/")) {
            setVideoFile(file);
            setVideoPreviewUrl(URL.createObjectURL(file));
            setVideoError("")
        } else {
            setVideoFile(null);
            setVideoPreviewUrl(null);
        }
    };

    const handleRemoveVideo = () => {
        setVideoFile(null);
        setVideoPreviewUrl(null);
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl("");
    };

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

    // Handle form submission
    const handleSubmit = async (e) => {
        let allError = {}
        e.preventDefault()

        if (!price) {
            allError.price = "Please Enter Amount ."
        } else if (!/^\d*$/.test(price)) {
            allError.price = "Enter Valid Amount"
        }

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
            allError.description = "Please Enter Description"
        }

        if (!category) {
            allError.category = "Please Select Category."
        }

        if (Object?.keys(allError)?.length > 0) {
            setErrors(allError)
            if (!image) {
                setError("Please upload Image.");
            }
            if (!image02) setError02("Please upload Image.");
            if (!image03) setError03("Please upload Image.");
            if (!image04) setError04("Please upload Image.");
            if (!videoFile) setVideoError("Please upload Video.");
            return
        }

        if (!image) {
            setError("Please upload Image.");
        }
        if (!image02) setError02("Please upload Image.");
        if (!image03) setError03("Please upload Image.");
        if (!image04) setError04("Please upload Image.");
        if (!videoFile) setVideoError('please upload Video')

        if (!image || !image02 || !image03 || !image04 || !videoFile) return


        const formData = new FormData();
        formData.append("price", price)
        formData.append("image", image);
        formData.append("image02", image02);
        formData.append("image03", image03);
        formData.append("image04", image04);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append('videoFile', videoFile)
        console.log(formData, 'hjhlkgfgmnfgmn')
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}api/admin/add_invitation`,
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
                setImage02(null)
                setImage03(null)
                setImage04(null)
                setName("");
                setDescription("");
                setCategory("");
                setVideoFile(null)
                setPrice("")
                setErrors({});
                navigate("/invitation")
            } else {
                setError("Failed to upload the image.");
                setError02("Failed to upload the image.");
                setError03("Failed to upload the image.");
                setError04("Failed to upload the image.");

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
                                    Add Invitation
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={5} mx={2}>
                                <MDBox component="form" role="form" sx={{ minHeight: "60vh" }}>
                                    <Grid container spacing={3}>


                                        <Grid item xs={12} md={6} xl={4} display="flex" justifyContent="center">
                                            <MDBox mb={2} width='100%'>
                                                <FormControl fullWidth>
                                                    <InputLabel id="client-name-label" sx={{ paddingTop: "8px", paddingBottom: "3px" }}>
                                                        Box Category
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
                                                        {invitationCategory.map((invitation) => (
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
                                        <Grid item xs={12} md={6} xl={4} display="flex" justifyContent="center">
                                            <MDBox mb={2} width='100%' >
                                                <MDInput
                                                    type="text"
                                                    label="Box Name"
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

                                        {/* <Grid item xs={12} md={6} xl={3} mt={1} > */}
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
                                                    value={image}
                                                    onChange={handleChangefile}
                                                    placeholder="Upload Box Image01"
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
                                                    value={image02}
                                                    onChange={handleChangefile2}
                                                    placeholder="Upload Box Image02"
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
                                                <MDBox mt={1}
                                                    sx={{ textAlign: "center" }}
                                                >
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
                                                    value={image03}
                                                    onChange={handleChangefile3}
                                                    placeholder="Upload Box Image03"
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
                                                <MDBox mt={1}
                                                    sx={{ textAlign: "center" }}
                                                >
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
                                                    value={image04}
                                                    onChange={handleChangefile4}
                                                    placeholder="Upload Box Image04"
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
                                                <MDBox mt={1}
                                                    sx={{ textAlign: "center" }}
                                                >
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
                                                    value={videoFile}
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

                                        <Grid item xs={12} md={6} xl={4} display="flex" justifyContent="center">
                                            <MDBox mb={2} width='100%'>
                                                <MDInput
                                                    type="text"
                                                    label="Box Description"
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
                                            Upload Invitation
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

export default Add_Invitation;
