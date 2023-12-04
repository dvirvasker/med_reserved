/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";

import { Link, withRouter, Redirect } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
// reactstrap components
import {
  Button,
  ButtonGroup,
  // Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Container,
  Col,
  Collapse,
} from "reactstrap";
import NGCarlogo from "assets/images/NGCarlogo.svg";

function HozlaAbout() {
  return (
    <Card>
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        borderRadius="lg"
        coloredShadow="mekatnar"
        mx={2}
        mt={-3}
        p={2}
        mb={1}
        textAlign="center"
      >
        <MDBox component="img" src={NGCarlogo} alt="NGCarlogo" width="12rem" alignSelf="center" />
        {/* <MDTypography variant="h4" fontWeight="medium"    mt={1}>מערכת הוצל"א</MDTypography> */}
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDTypography variant="h5" fontWeight="medium" mt={1}>
          מערכת NGCar היא מערכת שמציגה סטטיסטיקות ונתונים על הכלי רכב בצה"ל. המערכת משתמשת בקבצי
          אקסל ממערכת ענ"א איתוראן וממערכת מר"מ.
        </MDTypography>
      </MDBox>
    </Card>
  );
}

export default HozlaAbout;
