import { NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <>
            <header>
                <div>
                    <div>
                        <NavLink to="/" className="nav-logo">EventNexus</NavLink>
                    </div>
                </div>
                <nav className="navbar">
                    <div className="nav-container">
                        <NavLink to="/" className="nav-logo">EventNexus</NavLink>
                        <ul className="nav-menu">
                            <li className="nav-item">
                                <NavLink to="/events" className="nav-link">Events</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/create-event" className="nav-link">Create Event</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin" className="nav-link">Admin</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Navbar
