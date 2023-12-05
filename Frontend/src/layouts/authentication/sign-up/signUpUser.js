/* eslint-disable no-else-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint no-underscore-dangle: 0 */
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
import Selectmui, { SelectChangeEvent } from "@mui/material/Select";
import Select from "react-select";
import { useState, useEffect } from "react";

import { Icons, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Dialog
import { Dialog, DialogContent, DialogContentText, DialogTitle, Modal } from "@mui/material";

import { authenticate, isAuthenticated, signin, signout, updateRefreshCount } from "auth/index";

// Images
import bgImage from "assets/images/medbg.webp";
import axios from "axios";
import { Form, Label, Input, Col, Row, FormGroup } from "reactstrap";

// import bgImage from "assets/images/max-burger-DMRQmC8gRBs-unsplash.jpg";

// ? Hozla user ==> 0
// ? ToraHailit user ==> 3
function SignUpUser() {
  // const { userType, title, urlType } = props;
  const userType = "2";
  const title = "מערכת מג``מ";
  const [signUpData, setSignUpData] = useState({
    personalnumber: "",
    role: "",
    unit: "",
    region: "",
    errortype: "",
    error: false,
    successmsg: false,
    loading: false,
    redirectToReferrer: false,
    //
    site_permission: "צפייה ועריכה",
  });
  const [units, setUnits] = useState([]);
  const [regions, setRegions] = useState([]);

  const options = [
    { value: "1", label: "משתמש יחידה" },
    { value: "2", label: "משתמש מרחב" },
  ];

  function getUnits() {
    axios
      .get(`http://localhost:8000/api/units`)
      .then((res) => {
        setUnits(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getRegions() {
    axios
      .get(`http://localhost:8000/api/region`)
      .then((res) => {
        setRegions(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // const passport = (event) => {
  //   axios
  //     .get(`http://localhost:8000/auth/passportauth`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setSignUpData({ ...signUpData, personalnumber: response.data.stam._json.cn });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  function handleChange(evt) {
    const { value } = evt.target;
    setSignUpData({ ...signUpData, [evt.target.name]: value });
  }

  function handleChange2(selectedOption) {
    if (!(selectedOption.target.value === "בחר")) {
      setSignUpData({ ...signUpData, [selectedOption.target.name]: selectedOption.target.value });
    } else {
      setSignUpData({ ...signUpData, [selectedOption.target.name]: "" });
    }
  }

  function handleChange3(selectedOption) {
    console.log(selectedOption);
    if (!(selectedOption.target.value === "בחר")) {
      setSignUpData({ ...signUpData, [selectedOption.target.name]: selectedOption.target.value });
    } else {
      setSignUpData({ ...signUpData, [selectedOption.target.name]: "" });
    }
  }

  //* ------------------Pop up models messages--------------------------

  const handleCloseSuccsecModal = () => {
    setSignUpData({
      ...signUpData,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: true,
    });
  };

  const handleCloseLoadingModal = () => {
    setSignUpData({ ...signUpData, loading: false });
  };
  const handleCloseErrorModal = () => {
    setSignUpData({
      ...signUpData,
      loading: false,
      error: false,
      successmsg: false,
      NavigateToReferrer: false,
    });
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function NavigateUser() {
    if (signUpData.NavigateToReferrer) {
      return <Navigate to="/Dashboard" />;
    }
  }

  const showSuccess = () => (
    <Dialog
      open={signUpData.successmsg}
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
          נרשמת בהצלחה למערכת
        </MDTypography>
        <MDButton onClick={handleCloseSuccsecModal} variant="gradient" color="light">
          מעבר לאתר
        </MDButton>
      </MDBox>
    </Dialog>
  );
  const showError = () => (
    <Dialog
      open={signUpData.error}
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
          שגיאה בהרשמה
        </MDTypography>

        <DialogContent>
          <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
            וודא שהינך כבר רשום למערכת, במידה ולא נסה שנית מאוחר יותר
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
      open={signUpData.loading}
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
            ההרשמה תיקח מספר רגעים...
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

    if (signUpData.personalnumber === "") {
      flag = false;
      ErrorReason.push("אנא הכנס מספר אישי");
      // toast.error(ErrorReason);
    }
    if (!(signUpData.personalnumber.length === 7 || signUpData.personalnumber.length === 9)) {
      flag = false;
      ErrorReason.push("אנא וודא כי המספר האישי תקין");
      // toast.error(ErrorReason);
    }
    if (signUpData.firstName === "") {
      flag = false;
      ErrorReason.push("אנא הכנס שם פרטי");
      // toast.error(ErrorReason);
    }
    if (signUpData.role === "") {
      flag = false;
      ErrorReason.push("הרשאה ריקה \n");
    } else {
      if (signUpData.role === "2") {
        signUpData.unit = "";
      }
      if (signUpData.role === "1") {
        signUpData.region = "";
      }
    }
    if (signUpData.lastName === "") {
      flag = false;
      ErrorReason.push("אנא הכנס שם משפחה");
      // toast.error(ErrorReason);
    }
    // if (userType === "") {
    //   flag = false;
    //   ErrorReason.push("אנא בחר מערכת להרשמה");
    //   // toast.error(ErrorReason);
    // }
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

  const SignUp = (event) => {
    event.preventDefault();
    setSignUpData({ ...signUpData, loading: true, successmsg: false, error: false });
    const user = {
      role: signUpData.role,
      personalnumber: signUpData.personalnumber,
      unit: signUpData.unit,
      region: signUpData.region,

      site_permission: signUpData.site_permission,
    };
    console.log(user);
    axios
      .post(`http://localhost:8000/api/signup`, user)
      .then((res) => {
        setSignUpData({ ...signUpData, loading: false, error: false, successmsg: true });
        toast.success(`הרשמתך נקלטה בהצלחה`);
        // console.log(res.data);
      })
      .catch((error) => {
        // console.log(error);
        setSignUpData({
          ...signUpData,
          errortype: error.response.data.error,
          loading: false,
          error: true,
        });
      });
  };

  const SendFormData = async (event) => {
    event.preventDefault();
    setSignUpData({ ...signUpData, loading: true, successmsg: false, error: false });
    event.preventDefault();
    let flag = true;
    let ErrorReason = "";
    if (signUpData.name === "") {
      flag = false;
      ErrorReason += "שם ריק \n";
    }
    if (signUpData.unit === "") {
      flag = false;
      ErrorReason += "שם משפחה ריק \n";
    }
    if (signUpData.personalnumber === "") {
      flag = false;
      ErrorReason += "מס אישי ריק \n";
    }
    if (signUpData.role === "") {
      flag = false;
      ErrorReason += "הרשאה ריקה \n";
    }
    if (signUpData.region === "") {
      flag = false;
      ErrorReason += "סוג מרחב ריק\n";
    }
    const c = signUpData.personalnumber.charAt(0);
    if (c >= "0" && c <= "9") {
      // it is a number
      const s = "s";
      const temppersonalnumber = `${s + signUpData.personalnumber}`;
      signUpData.personalnumber = temppersonalnumber;
    } else {
      // it isn't
      if (c === c.toUpperCase()) {
        // UpperCase Letter -Make Lowercase
        const tempc = c.toLowerCase();
        let temppersonalnumber = signUpData.personalnumber;
        temppersonalnumber = temppersonalnumber.substring(1);
        temppersonalnumber = tempc + temppersonalnumber;
        signUpData.personalnumber = temppersonalnumber;
      }
      if (c === c.toLowerCase()) {
        // LowerCase Letter - All Good
      }
    }

    SignUp(event);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (CheckSignUpForm(event)) {
      SendFormData(event);
    }
  };

  //* ------------------Send data to server - end--------------------------
  const singUpUser = () => (
    <Card>
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        borderRadius="lg"
        coloredShadow="success"
        mx={2}
        mt={-3}
        p={3}
        mb={1}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          {title}
        </MDTypography>
        <MDTypography display="block" variant="button" color="white" my={1}>
          הגיע הזמן להירשם אלינו 😉
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form" onSubmit={onSubmit}>
          <MDBox mb={2}>
            <MDInput
              required
              type="text"
              name="personalnumber"
              onChange={handleChange}
              variant="standard"
              label="מספר אישי"
              value={signUpData.personalnumber}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <Col>
              <FormGroup>
                <Label for="role" size="sm">
                  בחר סוג משתמש
                </Label>
                <Input
                  name="role"
                  id="role"
                  type="select"
                  value={signUpData.role}
                  onChange={handleChange3}
                >
                  <option disabled value="">
                    בחר
                  </option>
                  {options.map((option, index) => (
                    <option id={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </MDBox>
          {signUpData.role === "2" ? (
            <MDBox mb={2}>
              <Col>
                <FormGroup>
                  <Label for="region" size="sm">
                    בחר מרחב
                  </Label>
                  <Input
                    // placeholder={textPlaceHolderInputs[5]}
                    name="region"
                    id="region"
                    type="select"
                    value={signUpData.region}
                    onChange={handleChange2}
                  >
                    <option disabled value="">
                      בחר
                    </option>
                    {regions.map((region, index) => (
                      <option id={index} value={region._id}>
                        {region.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </MDBox>
          ) : signUpData.role === "1" ? (
            <MDBox mb={2}>
              <Col>
                <FormGroup>
                  <Label for="unit" size="sm">
                    בחר יחידה
                  </Label>
                  <Input
                    name="unit"
                    id="unit"
                    type="select"
                    value={signUpData.unit}
                    onChange={handleChange2}
                  >
                    <option disabled value="">
                      בחר
                    </option>
                    {units.map((unit, index) => (
                      <option id={index} value={unit._id}>
                        {unit.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </MDBox>
          ) : null}

          <MDBox mt={4} mb={1}>
            <MDButton variant="gradient" color="mekatnar" type="submit" fullWidth>
              <MDTypography color="light" fontWeight="medium" textGradient>
                הירשם
              </MDTypography>
            </MDButton>
          </MDBox>
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              <MDTypography
                component={Link}
                to={`/adminsignin`}
                variant="button"
                color="mekatnar"
                fontWeight="medium"
                textGradient
              >
                להתחברות לחץ כאן
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );

  useEffect(() => {
    // passport();
    getUnits();
    getRegions();
  }, []);

  return (
    <CoverLayout image={bgImage}>
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

      {singUpUser()}
    </CoverLayout>
  );
}
export default SignUpUser;
