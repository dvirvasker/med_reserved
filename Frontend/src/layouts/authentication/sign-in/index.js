/* eslint-disable no-else-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-brace-presence */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link, Navigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import {
  Button,
  CardHeader,
  Container,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Nav,
} from "reactstrap";
// import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

import { Icons, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Dialog
import { Dialog, DialogContent, DialogContentText, DialogTitle, Modal } from "@mui/material";

import { authenticate, isAuthenticated, signin, signout, updateRefreshCount } from "auth/index";

// Images
import bgImage from "assets/images/medbg.webp";
import axios from "axios";
import mgm from "assets/images/mgm.png";
import BasicLayout from "../components/BasicLayout";

function signIn(props) {
  // const { title, urlType } = props;
  const title = "מג``מ";
  const [values, setValues] = useState({
    personalnumber: "",
    errortype: "",
    error: false,
    successmsg: false,
    loading: false,
    redirectToReferrer: false,
    NavigateToReferrer: false,
  });

  const { personalnumber, loading, redirectToReferrer } = values;
  function handleChange(evt) {
    const { value } = evt.target;
    setValues({ ...values, [evt.target.name]: value });
  }

  //* ------------------Pop up models messages--------------------------

  const handleCloseSuccsecModal = () => {
    setValues({
      ...values,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: true,
      redirectToReferrer: true,
    });
  };

  const handleCloseLoadingModal = () => {
    setValues({ ...values, loading: false });
  };
  const handleCloseErrorModal = () => {
    setValues({
      ...values,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: false,
    });
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function NavigateUser() {
    if (values.NavigateToReferrer) {
      console.log(isAuthenticated());
      if (isAuthenticated().user.role === "0" || isAuthenticated().user.role === "2")
        return <Navigate to="/dashboard/" />;
      return <Navigate to="/miluimpage" />;
    }
  }

  const showSuccess = () => (
    <Dialog
      open={values.successmsg}
      onClose={handleCloseSuccsecModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        coloredShadow="mekatnar"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          התחברת בהצלחה למערכת
        </MDTypography>
        <MDButton onClick={handleCloseSuccsecModal} variant="gradient" color="light">
          מעבר לאתר
        </MDButton>
      </MDBox>
    </Dialog>
  );
  const showError = () => (
    <Dialog
      open={values.error}
      onClose={handleCloseErrorModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="error"
        coloredShadow="error"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          שגיאה בהתחברות
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            {values.errortype}
          </MDTypography>
          <MDButton onClick={handleCloseErrorModal} variant="gradient" color="light">
            סגירה
          </MDButton>
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const showLoading = () => (
    <Dialog
      open={values.loading}
      onClose={handleCloseLoadingModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        coloredShadow="mekatnar"
        borderRadius="l"
        // mx={2}
        // mt={2}
        p={3}
        px={5}
        // mb={2}
        textAlign="center"
      >
        <MDTypography variant="h1" fontWeight="medium" color="white" mt={1}>
          בטעינה
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            ההתחברות תיקח מספר רגעים...
          </MDTypography>
        </DialogContent>
      </MDBox>
    </Dialog>
  );

  //* ------------------Pop up models messages - end--------------------------

  //* ------------------Send data to server--------------------------
  // eslint-disable-next-line consistent-return
  const CheckSignUpForm = (event) => {
    event.preventDefault();
    let flag = true;
    const ErrorReason = [];

    if (values.personalnumber === "") {
      flag = false;
      ErrorReason.push("אנא הכנס מספר אישי תקין");
      // toast.error(ErrorReason);
    }
    if (flag !== true) {
      ErrorReason.forEach((reason) => {
        toast.error(reason);
        // setData({ ...data, loading: false, successmsg: false, error: true });
      });

      return false;
    } else {
      return true;
      // setData({ ...data, loading: false, successmsg: true, error: false });
    }
  };

  const SendFormData = async (event) => {
    // event.preventDefault()
    setValues({ ...values, loading: true, successmsg: false, error: false });
    axios
      .post(`http://localhost:8000/api/signin`, { personalnumber })
      .then((res) => {
        if (res.data.user === "DoNotExist" || res.data.user === undefined) {
          setValues({
            ...values,
            errortype: "המשתמש אינו קיים, עליך להירשם",
            loading: false,
            successmsg: false,
            error: true,
          });
        } else if (
          res.data.user.approved === false &&
          (res.data.user.admin === "1" || res.data.user.admin === "2")
        ) {
          setValues({
            ...values,
            loading: false,
            successmsg: false,
            error: true,
          });
          const count = parseInt(localStorage.getItem("RefreshCount"), 10) + 1;
          updateRefreshCount(count);
        } else {
          authenticate(res.data);
          setValues({
            ...values,
            loading: false,
            successmsg: true,
            error: false,
          });
          const count = parseInt(localStorage.getItem("RefreshCount"), 10) + 1;
          updateRefreshCount(count);
        }
      })
      .catch((error) => {
        setValues({
          ...values,
          errortype: error.error,
          loading: false,
          error: true,
          redirectToReferrer: false,
          NavigateToReferrer: false,
        });
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (CheckSignUpForm(event)) {
      SendFormData(event);
    }
  };

  //* ------------------Send data to server - end--------------------------
  const signInForm = () => (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="mekatnar"
          borderRadius="lg"
          coloredShadow="mekatnar"
          mx={2}
          mt={-3}
          p={2}
          pb={1}
          mb={1}
          textAlign="center"
        >
          <img src={mgm} alt="mgm" />
        </MDBox>
        <MDBox pt={1} pb={5} px={3}>
          <MDTypography variant="h4" fontWeight="medium" color="dark" textAlign="center" mt={1}>
            התחברות ל{title}
          </MDTypography>
          <MDBox component="form" role="form" onSubmit={onSubmit}>
            <MDBox mb={2}>
              <MDInput
                required
                type="text"
                name="personalnumber"
                onChange={handleChange}
                variant="standard"
                label="מספר אישי"
                value={values.personalnumber}
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="mekatnar" fullWidth>
                התחברות
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                עוד לא נרשמת?{" "}
                <MDTypography
                  component={Link}
                  to={`/sign-up`}
                  variant="button"
                  color="mekatnar"
                  fontWeight="medium"
                  textGradient
                >
                  לחץ כאן
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );

  return (
    <>
      {/* <DashboardLayout> */}
      {/* <DashboardNavbar /> */}
      {/* <MDBox pt={6} pb={3}> */}
      {/* //! fot the pop up warning windoes */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {showError()}
      {showSuccess()}
      {showLoading()}
      {NavigateUser()}

      {signInForm()}
      {/* </MDBox> */}
      {/* <Footer /> */}
      {/* </DashboardLayout> */}
    </>
  );
}

export default signIn;
