import { createElement } from "preact";
import AdminSignInView from "./Views/AdminSignIn";
import DashboardView from "./Views/Dashboard";
import ManageView from "./Views/Manage";
import RamamView from "./Views/Ramam";
import SignUpView from "./Views/SignUp";
import TkinotHazanotView from "./Views/TkinotHazanot";
import UnitTreeView from "./Views/UnitTree";
import ZminotView from "./Views/ZminotView/Zminot";
import MiluimView from "./Views/MiluimView/Miluim";
import MiluimPage from "./Views/MiluimPage";
import ZminotTatYehidotView from "./Views/ZminotTatYehidot";

// };
//* to be added props like theme etc...
interface MyComponentProps { }

//* path fromat: key<description/name to be called> : Map(url : component)
//? side note i can add svgs here but will only worth if we automate layout
const PATHS = {
	DASHBOARD: new Map<string, React.FC<MyComponentProps>>().set(
		"dashboard/",
		DashboardView
	),
	// SIGN_IN: new Map<string, React.FC<MyComponentProps>>().set("signin",DashboardView),
	SIGN_UP: new Map<string, React.FC<MyComponentProps>>().set(
		"signup",
		SignUpView
	),
	ADMIN_SIGN_IN: new Map<string, React.FC<MyComponentProps>>().set(
		"adminsignin",
		AdminSignInView
	),
	MILUIM_PAGE: new Map<string, React.FC<MyComponentProps>>().set(
		"miluimpage",
		MiluimPage
	),
	MILUIM_ARCHIVE_PAGE: new Map<string, React.FC<MyComponentProps>>().set(
		"MiluimArchivepage",
		MiluimView
	),
	Manage_USERS: new Map<string, React.FC<MyComponentProps>>().set(
		"manageusers",
		TkinotHazanotView
	),
	SUB_UNIT_ZMINOT: new Map<string, React.FC<MyComponentProps>>().set(
		"zminot_sub_unit",
		ZminotTatYehidotView
	),
	// ZMINOT_TABLE: new Map<string, React.FC<MyComponentProps>>().set(
	// 	"zminot_table",
	// 	ZminotView
	// ),
	UNIT_TREE: new Map<string, React.FC<MyComponentProps>>().set(
		"unit_tree",
		UnitTreeView
	),
	RAMAM_TABLE: new Map<string, React.FC<MyComponentProps>>().set(
		"ramams",
		RamamView
	),
	TKINOT_HAZANOT: new Map<string, React.FC<MyComponentProps>>().set(
		"tkinot_hazanot",
		TkinotHazanotView
	),
	SYSTEM_MANAGEMENT: new Map<string, React.FC<MyComponentProps>>().set(
		"system_manage",
		ManageView
	),
	ABOUT: new Map<string, React.FC<MyComponentProps>>().set("about", "About"),
};

export default PATHS;

function key(path: Map<string, React.FC<MyComponentProps>>) {
	return path.keys().next().value;
}
function comp(path: Map<string, React.FC<MyComponentProps>>) {
	const firstComponent = path.values().next().value;
	return createElement(firstComponent, {});
}

export { key, comp };
