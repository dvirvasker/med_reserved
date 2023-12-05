import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import PATHS, { comp, key } from "./paths";

//* if you want to add a new page just add it to PATHS file at ./paths and it will be automatically added

function App() {
	const outerPaths = ["adminsignin", "signup", "signin"];
	const pathArr = Object.values(PATHS)
		.map((path) => {
			return Array.from(path.entries()).map(([key, Component]) => {
				if (!outerPaths.includes(key)) {
					return {
						path: key,
						element: <Component />,
					};
				} else {
					return {};
				}
			});
		})
		.flat()
		.filter((el) => el != undefined || Object.keys(el).length === 0);

	function makePage(page: Map<string, React.FC<{}>>) {
		return {
			path: key(page),
			element: comp(page),
		};
	}

	const router = createBrowserRouter([
		{
			path: "/",
			element: <MainLayout />,
			errorElement: <Navigate to={"/"} />,
			children: pathArr,
		},
		//* to make diffntial paths just do this: makePage(PATHS.wantPage)
		makePage(PATHS.ADMIN_SIGN_IN),
		makePage(PATHS.SIGN_UP),
	]);

	return <RouterProvider router={router} />;
}

export default App;
