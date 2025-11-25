import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import A11yTreeDemo from "../component/A11yTreeDemo";

const routes = [
	{
		path: "/",
		element: <App />,
		children: [
			{ index: true, element: <A11yTreeDemo /> },
		],
	},
];

const router = createBrowserRouter(routes, {
	basename: "/coseeing-a11y-tree-demo",
	future: {
		v7_relativeSplatPath: true,
	},
});

export default router;
