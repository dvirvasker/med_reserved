
import BazakIcon from "../assets/bazak_logo.svg?react";
import Mgmpng from "../assets/mgm.png";
import { iNavItem, iNavSection } from "../interfaces";
import { Box, Button, Divider, SvgIcon, Typography, useTheme } from "@mui/material";
import Card from "./Card";
import AddUserIcon from "../assets/add_user.svg?react";
import ToTeneTableIcon from "../assets/to_tene_table.svg?react";
import { NavLink } from "react-router-dom";
interface iSidebar {
  navSections: iNavSection[],
}

const Sidebar: React.FC<iSidebar> = ({ navSections }) => {
  const theme = useTheme();

  const SidebarFooter = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: "auto", textAlign: "center" }}>
      <Button variant="contained">
        <AddUserIcon fill={theme.palette.background.default} />
        <Typography sx={{ mr: "auto", ml: "auto" }}>רשום משתמש</Typography>
      </Button>

      <Button variant="outlined">
        <ToTeneTableIcon fill={theme.palette.background.default} />
        <Typography sx={{ mr: "auto", ml: "auto" }}>חזרה לשולחן טנא</Typography>
      </Button>
    </Box>
  )


  const NavItem = ({ item }: { item: iNavItem }) => (
    <NavLink to={item.to}>
      {isActive => (
        <Button component={Box} href={item.to} fullWidth variant={isActive.isActive ? "contained" : "text"} color={isActive.isActive ? "primary" : "inherit"}>
          <item.Icon />
          <Typography color="text.primary" sx={{ mr: "auto", ml: "auto" }}>{item.text}</Typography>
        </Button>)
      }
    </NavLink>
  );

  const MainNavSection = ({ navSections }: { navSections: iNavSection[] }) => (
    <>
      {
        navSections.map(section => (
          <Box key={section.text} sx={{ display: "flex", flexDirection: "column", gap: 1.5, textAlign: "center" }}>
            <Divider>{section.text}</Divider>
            {section.items.map(navItem => <NavItem key={navItem.text} item={navItem} />)}
          </Box>
        ))
      }
    </>

  );

  const BazakHeader = () => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 0, gap: 1 }}>
      {/* <Typography sx={{fontWeight: "bold", fontSize: 40, display: {
                xs: "none",
                md: "inline"
            }}}>מערכת בזכ</Typography>
            <SvgIcon component={BazakIcon} /> */}
      <img style={{ width: "110%", height: "110%" }} src={Mgmpng} alt="Mgmpng" />
    </Box>
  )


  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
      <BazakHeader />
      <MainNavSection navSections={navSections} />
      <SidebarFooter />
    </Card>
  )

};

export default Sidebar;