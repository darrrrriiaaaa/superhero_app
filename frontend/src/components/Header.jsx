import { NavLink } from "react-router-dom";

// import styles
import "../styles/header.css";

// import images
import marvel_horizontal_picture from "../images/marvel comic puzzle.jpg";

const Header = () => {
    return (
        <div className="HeaderSection">
            <img src={marvel_horizontal_picture} alt="Superheroes" className="HeaderSectionImage" />
            <section className="HeaderSectionMenu">
                <NavLink to="/" className="HeaderText HeaderMenuText">Home</NavLink>
                <NavLink to="/superheroes" className="HeaderText HeaderMenuText">Superheroes</NavLink>
                <NavLink to="/about" className="HeaderText HeaderMenuText">About</NavLink>
            </section>
        </div>
    )
};

export default Header;