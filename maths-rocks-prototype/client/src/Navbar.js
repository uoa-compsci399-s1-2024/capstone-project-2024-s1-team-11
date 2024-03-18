import { Link } from "react-router-dom";
import "./styling/Navbar.css";

function Navbar(){
    return(
        <nav>
            <ul>
                <li><Link to="/">Homepage</Link></li>
                <li><a href="/maths/1">Maths</a></li>
                <li><Link to="/">Registration</Link></li>
                <li><Link to="/">Login</Link></li>
                <li><Link to="/">About Us</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;