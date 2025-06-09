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
import MDInput from "components/MDInput";
import { planningCategoryData } from "layouts/staticData/index";
import { position } from "stylis";
import { logout } from "layouts/common";


function Add_Planning() {
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const [category, setCategory] = useState(null);
    // const [description, setDescription] = useState("");
    const [description, setDescription] = useState([""]);



    const [successSB, setSuccessSB] = useState(false);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({})

    const planningList = planningCategoryData;

    const addDescriptionField = () => {
        setDescription([...description, ""]);
    };

    const removeDescription = (index) => {
        const updatedDescription = [...description];
        updatedDescription.splice(index, 1);
        setDescription(updatedDescription);
    }

    const handleDescriptionChange = (index, value) => {
        const updatedDescriptions = [...description];
        updatedDescriptions[index] = value;
        setDescription(updatedDescriptions);
        setErrors((prev) => ({ ...prev, [`description${index}`]: "" }));
    };

    const handleSubmit = async () => {
        let allErrors = {}

        // if (!description) {
        //     allError.description = "Please Enter description"
        //     setErrors(allError);
        //     return;
        // }


        description.forEach((desc, index) => {
            if (desc.trim() === "") {
                allErrors[`description${index}`] = "Please Add Task";
            }
        });

        if (!category) {
            allErrors.category = "Please Select Category."
            // setErrors(allErrors);
            // return;
        }

        if (Object.keys(allErrors)?.length > 0) {
            setErrors(allErrors);
            return;
        }

        const PlanningData = {
            category, description
        }


        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}api/admin/add_planning`,
                PlanningData
                ,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                setSuccessSB(true);
                setDescription("");
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
                                    Add Planning
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={5} mx={2}>
                                <MDBox component="form" role="form" sx={{ minHeight: "60vh" }}>
                                    <Grid container spacing={3}>


                                        <Grid item xs={12} md={6} xl={12} display="flex" justifyContent="center">
                                            {/* <MDBox mb={2} width='25%'>
                                                <FormControl fullWidth>
                                                    <InputLabel id="client-description-label" sx={{ paddingTop: "8px", paddingBottom: "3px" }}>
                                                        Event
                                                    </InputLabel>
                                                    <Select
                                                        labelId="client-description-label"
                                                        value={category}
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
                                            </MDBox> */}
                                            <Grid item xs={12} md={6} xl={12} display="flex" justifyContent="center">
                                                <MDBox mb={2} width='25%' >
                                                    <MDInput
                                                        type="text"
                                                        label="Event"
                                                        fullWidth
                                                        value={category}
                                                        onChange={(e) => {
                                                            setCategory(e.target.value)
                                                            setErrors((prev) => ({ ...prev, category: "" }));
                                                        }}
                                                        sx={{ marginTop: "8px" }}
                                                    />
                                                    {errors.category && (
                                                        <div style={{ color: "red", fontSize: "12px", fontWeight: 350, marginTop: "8px" }}>{errors.category}</div>
                                                    )}
                                                </MDBox>
                                            </Grid>
                                        </Grid>
                                        {/* <Grid item xs={12} md={6} xl={12} display="flex" justifyContent="center">
                                            <MDBox mb={2} width='25%' >
                                                <MDInput
                                                    type="text"
                                                    label="Task"
                                                    fullWidth
                                                    value={description}
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
                                        {description?.map((desc, index) => (
                                            <Grid key={index} item xs={12} md={6} xl={12} display="flex" justifyContent="center">

                                                <MDBox mb={1} width='25%' display="flex" flexDirection='column' alignItems='baseline'>
                                                    <MDInput
                                                        type="text"
                                                        label={`Task ${index + 1}`}
                                                        fullWidth
                                                        multiline
                                                        minRows={2}
                                                        value={desc}
                                                        onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                                        sx={{ marginTop: "8px" }}
                                                    />
                                                    {errors[`description${index}`] && (
                                                        <div style={{ color: "red", fontSize: "12px", fontWeight: 350, marginTop: "5px" }}>
                                                            {errors[`description${index}`]}
                                                        </div>
                                                    )}

                                                </MDBox>
                                                {
                                                    description?.length - 1 > index && (
                                                        <MDButton
                                                            variant="outlined"
                                                            color="error"
                                                            onClick={(e) => removeDescription(index)}
                                                            // sx={{
                                                            //     marginTop: "10px", marginLeft: "8px",
                                                            //     marginRight: "-75px",
                                                            //     height: "20px"
                                                            // }}
                                                            sx={{
                                                                marginTop: "20px", marginLeft: "8px",
                                                                marginRight: "-75px",
                                                                height: "20px"
                                                            }}
                                                        > -
                                                        </MDButton>
                                                    )
                                                }

                                                <MDBox sx={{ position: 'relative' }}>



                                                    {description?.length - 1 == index && (
                                                        <MDButton
                                                            variant="outlined"
                                                            color="error"
                                                            onClick={removeDescription}
                                                            sx={{
                                                                position: 'absolute',
                                                                right: '-150px',
                                                                top: '20px'

                                                            }}
                                                        >
                                                            -
                                                        </MDButton>
                                                    )}

                                                    {index === description?.length - 1 && (
                                                        <MDButton
                                                            variant="outlined"
                                                            color="info"
                                                            onClick={addDescriptionField}

                                                            sx={{
                                                                marginTop: "20px", marginLeft: "8px",
                                                                marginRight: "-75px", height: "20px"
                                                            }}
                                                        >
                                                            +
                                                        </MDButton>
                                                    )}
                                                </MDBox>

                                            </Grid>
                                        ))}


                                    </Grid>
                                    <MDBox mt={4} mb={1} sx={{ textAlign: "center" }}>
                                        <MDButton variant="gradient" color="info" onClick={handleSubmit}>
                                            Submit
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

export default Add_Planning;
