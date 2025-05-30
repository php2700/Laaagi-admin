import { useState } from "react";
import axios from 'axios';

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  // Axios interceptor to handle token expiration globally
  axios.interceptors.response.use(
    response => response,
    error => {
      const message = error?.response?.data?.Message || "";

      if (
        error.response &&
        (error.response.status === 400 || error.response.status === 403)
      ) {
        if (
          message.toLowerCase().includes("jwt expired") ||
          message.toLowerCase().includes("token not found")
        ) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("_id");
          navigate("/");
        }
      }

      return Promise.reject(error);
    }
  );

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const logout = () => {
    navigate('/');
    setTimeout(() => {
      localStorage.removeItem("_id");
      localStorage.removeItem("authToken");
    }, 100);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setErrorMessage("");

    if (!email) {
      setEmailError("Email is required.");
      return;
    }
    if (!password) {
      setPasswordError("Password is required.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}api/admin/admin_login`, {
        email,
        password,
      });

      const token = response?.data?.token;
      localStorage.setItem('authToken', token);
      navigate('/dashboard');
    } catch (error) {
      if (error.response?.data?.Message?.toLowerCase().includes("jwt expired")) {
        logout();
        setErrorMessage(error.response?.data?.Message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" onSubmit={handleLogin} role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth value={email}
                onChange={(e) => setEmail(e.target.value)} />
              {emailError && (
                <MDTypography variant="caption" color="error">
                  {emailError}
                </MDTypography>
              )}
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth value={password}
                onChange={(e) => setPassword(e.target.value)} />
              {passwordError && (
                <MDTypography variant="caption" color="error">
                  {passwordError}
                </MDTypography>
              )}
              {errorMessage && (
                <MDTypography variant="caption" color="error">
                  {errorMessage}
                </MDTypography>
              )}
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
