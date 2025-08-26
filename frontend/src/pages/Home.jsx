// import styles
import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <div className="Section">
            <p>This is Superhero Database! Look information about your favourite characters, add them, update and delete!</p>
            <NavLink to="/superheroes" className="Button">Look all superheroes</NavLink>
        </div>
    );
};

export default Home;