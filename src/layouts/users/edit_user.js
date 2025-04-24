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
import { sweetsData } from "layouts/staticData/index";


function Edit_User() {
    const location = useLocation();
    const navigate = useNavigate();
    const { userData } = location.state || {};

    const token = localStorage.getItem("authToken");
    const [controller] = useMaterialUIController();
    const { sidenavColor } = controller;

    const [status, setStatus] = useState(null);
    const [mobile, setMobile] = useState(null);
    const [name, setName] = useState(null);
    const [_id, setId] = useState();

    const [previewUrl, setPreviewUrl] = useState("");
    const [successSB, setSuccessSB] = useState(false);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({})



    useEffect(() => {
        setId(userData?._id)
        setName(userData?.name)
        setStatus(userData?.status)
        setMobile(userData?.mobile)
    }, [userData]);


    const handleSubmit = async () => {
        let allError = {}

        if (!name) {
            allError.name = "Please Enter name"
            setErrors(allError);
            return;
        }

        if (!mobile) {
            allError.mobile = "Please add  mobile."
            setErrors(allError);
            return;
        }

        const edituserData = {
            "_id": _id,
            "name": name,
            "mobile": mobile,
        }

        try {
            const response = await axios.patch(
                `${process.env.REACT_APP_BASE_URL}api/admin/edit-user`,
                edituserData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                setSuccessSB(true);
                setId("")
                setName("");
                setStatus("");
                setMobile("");
                setErrors({});
                navigate("/users")
            }
        } catch (error) {
            console.error("Error uploading banner:", error);
            setError("Error ");
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
                                    Edit User
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={5} mx={2}>
                                <MDBox component="form" role="form" sx={{ minHeight: "60vh" }}>
                                    <Grid container spacing={3}>

                                        <Grid item xs={12} md={6} xl={12} display="flex" justifyContent="center" >
                                            <MDBox mb={2} width='25%'>
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
                                        <Grid item xs={12} md={6} xl={12} display='flex' justifyContent='center'>
                                            <MDBox mb={2} width='25%'>
                                                <MDInput
                                                    type="Number"
                                                    label="Mobile"
                                                    fullWidth
                                                    value={mobile || ""}
                                                    onChange={(e) => {
                                                        setMobile(e.target.value)
                                                        setErrors((prev) => ({ ...prev, status: "" }))
                                                    }
                                                    }
                                                    sx={{ marginTop: "8px" }}
                                                />
                                                {errors.status && (
                                                    <div style={{ color: "red", fontSize: "12px", fontWeight: 350, marginTop: "8px" }}>{errors.status}</div>
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
        </DashboardLayout>
    );
}

export default Edit_User;
