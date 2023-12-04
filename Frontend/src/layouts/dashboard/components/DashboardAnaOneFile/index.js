/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
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

import { useEffect, useState } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

// Material Dashboard 2 React components
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import backgroundImage from "assets/images/jeepArmy.jpg";
import burceMars from "assets/images/bruce-mars.jpg";

import soldierAvatar from "assets/images/soldier.png";
import { authenticate, isAuthenticated, signout } from "auth/index";

const { user } = isAuthenticated();

function DashboardHeader(props, { children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(props.tabViewValue);

  const [loggedInUser, setLoggedInUser] = useState("אורח");
  useEffect(() => {
    // axios
    //   .get(`http://localhost:5000/users/1234567`)
    //   .then((response) => {
    //     console.log(response.data);
    //     setLoggedInUser(`${response.data.firstName} ${response.data.lastLame}`);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     console.log(error.code);
    //   });
    if (user) {
      setLoggedInUser(`${user.firstName} ${user.lastLame}`);
    } else {
      setLoggedInUser("אורח");
    }
    // if (typeof window !== "undefined") {
    //   localStorage.setItem("dashboardView", JSON.stringify({ tabIndexName: "מחלקה", tabIndex: 0 }));
    // }
  }, []);

  const loggedInUserString = `ברוך הבא ${loggedInUser}`;

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, tabIndex) => {
    let tabIndexName = "";

    if (tabIndex === 0) {
      tabIndexName = "גדוד";
    } else if (tabIndex === 1) {
      tabIndexName = "חטיבה";
    } else if (tabIndex === 2) {
      tabIndexName = "אוגדה";
    } else if (tabIndex === 3) {
      tabIndexName = "פיקוד";
    } else if (tabIndex === 4) {
      tabIndexName = "מטכ''ל";
    }
    setTabValue(tabIndex);
    props.setTabViewValue(tabIndex);
    // if (typeof window !== "undefined") {
    //   localStorage.setItem("dashboardView", JSON.stringify({ tabIndexName, tabIndex }));
    // }
  };

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.mekatnar.main, 0.6),
              rgba(gradients.mekatnar.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            {/* <MDAvatar src={soldierAvatar} alt="profile-image" size="xl" shadow="sm" /> */}
            <MDAvatar src={soldierAvatar} alt="profile-image" size="xl" />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography color="mekatnar" variant="h4" fontWeight="medium">
                {loggedInUserString}
              </MDTypography>
              {/* <MDTypography variant="button" color="text" fontWeight="regular">
                CEO / Co-Founder
              </MDTypography> */}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="גדוד"
                  // icon={
                  //   <Icon fontSize="small" sx={{ mt: -0.25 }}>
                  //     settings
                  //   </Icon>
                  // }
                />
                <Tab
                  label="חטיבה"
                  // icon={
                  //   <Icon fontSize="small" sx={{ mt: -0.25 }}>
                  //     settings
                  //   </Icon>
                  // }
                />
                <Tab
                  label="אוגדה"
                  // icon={
                  //   <Icon fontSize="small" sx={{ mt: -0.25 }}>
                  //     email
                  //   </Icon>
                  // }
                />
                <Tab
                  label="פיקוד"
                  // icon={
                  //   <Icon fontSize="small" sx={{ mt: -0.25 }}>
                  //     home
                  //   </Icon>
                  // }
                />
                <Tab
                  label="מטכ''ל"
                  // icon={
                  //   <Icon fontSize="small" sx={{ mt: -0.25 }}>
                  //     home
                  //   </Icon>
                  // }
                />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

// Setting default props for the DashboardHeader
DashboardHeader.defaultProps = {
  children: "",
};

// Typechecking props for the DashboardHeader
DashboardHeader.propTypes = {
  children: PropTypes.node,
};

export default DashboardHeader;
