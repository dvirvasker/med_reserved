import { Grid } from "@mui/material";
import Sidebar from "../Components/Sidebar";
import HomepageIcon from "../assets/homepage.svg?react";
import ZminotTatYehidotIcon from "../assets/zminot_tat_yehidot.svg?react";
import ScreensIcon from "../assets/screens.svg?react";
import UnitTreeIcon from "../assets/unit_tree.svg?react";
import SlidesCenterIcon from "../assets/slides_center.svg?react";
import DivoahZminotIcon from "../assets/divoah_zminot.svg?react";
import PermissionIcon from "../assets/permission_validation.svg?react";
import SettingsIcon from "../assets/settings.svg?react";
import AboutIcon from "../assets/about.svg?react";
import { iNavItem, iNavSection } from "../interfaces";
import { Outlet } from "react-router-dom";
import PATHS, { key } from "../paths";

const MainLayout = () => {
	const generalNavItems: iNavItem[] = [
		{
			text: "דף בית",
			to: key(PATHS.DASHBOARD),
			Icon: HomepageIcon,
		},
	];

	const tableNavItems: iNavItem[] = [
		{
			text: "טבלת מילואים",
			to: key(PATHS.MILUIM_PAGE),
			Icon: DivoahZminotIcon,
		},
		{
			text: "ארכיון התייצבות",
			to: key(PATHS.MILUIM_ARCHIVE_PAGE),
			Icon: DivoahZminotIcon,
		},
	];

	const adminNavItems: iNavItem[] = [
		{
			text: "ניהול הרשאות",
			to: key(PATHS.Manage_USERS),
			Icon: PermissionIcon,
		},
		// {
		// 	text: "ניהול מערכת",
		// 	to: key(PATHS.SYSTEM_MANAGEMENT),
		// 	Icon: SettingsIcon,
		// },
		// {
		// 	text: "אודות המערכת",
		// 	to: key(PATHS.ABOUT),
		// 	Icon: AboutIcon,
		// },
	];

	const generalNavSection: iNavSection = {
		text: "כללי",
		items: generalNavItems,
	};

	const tableNavSection: iNavSection = {
		text: "טבלאות",
		items: tableNavItems,
	};

	const adminNavSection: iNavSection = {
		text: "ניהול",
		items: adminNavItems,
	};
	const navSections = [generalNavSection, tableNavSection, adminNavSection];

	return (
		<Grid container height="100vh" columnSpacing={2} padding={2}>
			<Grid item xs={1} md={1.5}>
				<Sidebar navSections={navSections} />
			</Grid>

			<Grid item xs={11} md={10.5}>
				<Outlet />
			</Grid>
		</Grid>
	);
};

export default MainLayout;
