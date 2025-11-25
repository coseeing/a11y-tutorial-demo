import Header from "./component/common/Header";
import Container from "./component/common/Container";
import { Outlet } from "react-router-dom";

function App() {
	return (
		<>
			<Header />
			<Container className='pt-40'>
				<Outlet />
			</Container>
		</>
	);
}

export default App;
