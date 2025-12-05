import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PageDemo from "../component/PageDemo";

const routes = [
	{
		path: "/",
		element: <App />,
		children: [
			{ index: true, element: <PageDemo /> },
		],
	},
];

const router = createBrowserRouter(routes, {
	basename: "/a11y-tutorial-demo",
	future: {
		v7_relativeSplatPath: true,
	},
});

export default router;
