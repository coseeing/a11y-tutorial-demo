import Container from "./Container";
import { Link } from "react-router-dom";
import Logo from "../../assets/coseeing-logo-desktop-header.png";

const Header = () => {
	return (
		<header className='fixed inset-x-0 z-40 bg-teal-PRIMARY'>
			<Container className='flex items-center py-12'>
				<Link to='/' title='回首頁'>
					<img src={Logo} className='' alt='Coseeing logo' />
				</Link>
			</Container>
		</header>
	);
};

export default Header;
