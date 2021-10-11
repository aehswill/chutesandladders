import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <div className="navbar">
            <nav>
                <div>
                    <a href="/"><h1>Chutes and Ladders</h1></a>
                </div>
                <ul>
                    <Link to="/">Home</Link>
                    <Link to="/play">Play</Link>
                </ul>
            </nav>
        </div>
     );
}
 
export default Navbar;