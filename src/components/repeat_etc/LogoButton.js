import { Link } from "react-router-dom";
const LogoButton = () => {
	return (
		<div className="logodiv">
			<Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
				<button className="logo">STAR D</button>
			</Link>
		</div>
	);
};

export default LogoButton;
