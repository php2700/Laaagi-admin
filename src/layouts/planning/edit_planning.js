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
import { planningData } from "layouts/staticData/index";
import { planningCategoryData } from "layouts/staticData/index";
import { logout } from "layouts/common";

function Edit_Planning() {
    const location = useLocation();
    const navigate = useNavigate();
    const { planningData } = location.state || {};

    const token = localStorage.getItem("authToken");
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    // State for image file and success message
    const [sweetsImage, setSweetsImage] = useState(null);
    const [amount, setAmount] = useState(null);
    const [category, setCategory] = useState(null);
    // const [description, setDescription] = useState(null);
    const [description, setDescription] = useState([""]);

    const [_id, setId] = useState();

    const [previewUrl, setPreviewUrl] = useState("");
    const [successSB, setSuccessSB] = useState(false);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({})

    // const planningList = ["Marriage", "Mehndi", "Birthday", "Room Decor"];
    const planningList = planningCategoryData



    useEffect(() => {
        setId(planningData?._id)
        setDescription(planningData?.description)
        setCategory(planningData?.category)
    }, [planningData]);

    const handleDescription = (index, data) => {
        const updateDescription = [...description];
        updateDescription[index] = data;
        setDescription(updateDescription);
        setErrors((prev) => ({ ...prev, [`description${index}`]: "" }));
    }

    const handlePlanning = (index) => {
        const removeDescriptionData = [...description];
        removeDescriptionData.splice(index, 1);
        setDescription(removeDescriptionData);

    }

    const handleSubmit = async () => {
        let allError = {}

        // if (!description) {
        //     allError.description = "Please Enter description"
        //     setErrors(allError);
        //     return;
        // }

        description.forEach((ele, index) => {
            if (ele?.trim() === "") {
                allError[`description${index}`] = "Please Enter Task";
            }
        })

        if (Object.keys(allError)?.length > 0) {
            setErrors(allError);
            return;
        }


        if (!category) {
            allError.category = "Please select a category."
            setErrors(allError);
            return;
        }

        const updatedData = {
            _id: _id,
            category: category,
            description: description
        }

        try {
            const response = await axios.patch(
                `${process.env.REACT_APP_BASE_URL}api/admin/update_planning`,
                updatedData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                setSuccessSB(true);
                setId("")
                setDescription("");
                setAmount("");
                setCategory("");
                setErrors({});
                navigate("/planning")
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
                                    Edit Planning
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={5} mx={2}>
                                <MDBox component="form" role="form" sx={{ minHeight: "60vh" }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6} xl={12} display='flex' justifyContent='center'>
                                            <MDBox mb={2} width='25%'>
                                                <FormControl fullWidth>
                                                    <InputLabel id="client-description-label" sx={{ paddingTop: "8px" }}>
                                                        Category
                                                    </InputLabel>
                                                    <Select
                                                        labelId="client-description-label"
                                                        value={category || ""}
                                                        onChange={(e) => {
                                                            setCategory(e.target.value)
                                                            setErrors((prev) => ({ ...prev, category: "" }));
                                                        }}
                                                        label="Client description"
                                                        sx={{ height: "45px", marginTop: "8px" }}
                                                    >
                                                        {planningList?.map((sweets) => (
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
                                        {
                                            description?.map((des, index) => (
                                                <Grid key={index} item xs={12} md={6} xl={12} display="flex" justifyContent="center" >
                                                    <MDBox mb={2} width='25%'>
                                                        <MDInput
                                                            type="text"
                                                            label="Task"
                                                            fullWidth
                                                            multiline
                                                            minRows={2}
                                                            value={des || ""}
                                                            onChange={(e) => {
                                                                handleDescription(index, e.target.value)
                                                            }}
                                                            // onChange={(e) => {
                                                            //     setDescription(e.target.value)
                                                            //     setErrors((prev) => ({ ...prev, description: "" }))
                                                            // }}
                                                            sx={{ marginTop: "8px" }}
                                                        />
                                                        {errors[`description${index}`] && (
                                                            <div style={{ color: "red", fontSize: "12px", fontWeight: 350, marginTop: "8px" }}>{errors[`description${index}`]}</div>
                                                        )}
                                                    </MDBox>
                                                    {

                                                        <MDButton
                                                            variant='outlined'
                                                            color='error'
                                                            onClick={() => { handlePlanning(index) }}
                                                            sx={{
                                                                marginTop: "20px", marginLeft: "8px",
                                                                marginRight: "-75px",
                                                                height: "20px"
                                                            }}
                                                        >
                                                            -
                                                        </MDButton>

                                                    }
                                                </Grid>
                                            ))
                                        }
                                        {/* <Grid item xs={12} md={6} xl={12} display="flex" justifyContent="center" >
                                            <MDBox mb={2} width='25%'>
                                                <MDInput
                                                    type="text"
                                                    label="Task"
                                                    fullWidth
                                                    value={description || ""}
                                                    onChange={(e) => {
                                                        setDescription(e.target.value)
                                                        setErrors((prev) => ({ ...prev, description: "" }))
                                                    }}
                                                    sx={{ marginTop: "8px" }}
                                                />
                                                {errors.description && (
                                                    <div style={{ color: "red", fontSize: "12px", fontWeight: 350, marginTop: "8px" }}>{errors.description}</div>
                                                )}
                                            </MDBox>
                                        </Grid> */}


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
        </DashboardLayout>
    );
}

export default Edit_Planning;
