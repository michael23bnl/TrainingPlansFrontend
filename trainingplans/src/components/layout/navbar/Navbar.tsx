import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AuthNavbar from "./auth_navbar/AuthNavbar";
import chevronDownIcon from "../../../assets/chevron_down.svg";
import './Navbar.css';

export const Navbar = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const isAnyPlanRouteActive = [
        "/preparedplans",
        "/myplans",
        "/favoriteplans",
        "/completedplans",
    ].some(path => location.pathname.startsWith(path))

    const closeMenus = () => {
        setMenuOpen(false);
        setDropdownOpen(false);
    };

    return (
        <nav>  
            <div className="nav-container">
                <div className="nav-container-left">
                    {/* <div className="title">УТП</div> */}
                    <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <ul className={menuOpen ? "open" : ""}>
                        <li>
                            <NavLink to="/" onClick={closeMenus} className={({ isActive }) => (isActive ? "active" : "")}>
                                Главная
                            </NavLink>
                        </li>

                        <li
                            className="dropdown"
                            onMouseEnter={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}
                        >
                            <button className={`dropdown-button ${isAnyPlanRouteActive ? "active" : ""}`}>
                                <span>Планы</span>
                                <img src={chevronDownIcon} className="navbar-icon"></img>
                            </button>
                            <ul className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}>
                                <li>
                                    <NavLink to="/preparedplans" onClick={closeMenus} className={({ isActive }) => (isActive ? "active" : "")}>
                                        Каталог
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/myplans" onClick={closeMenus} className={({ isActive }) => (isActive ? "active" : "")}>
                                        Мои планы
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/favoriteplans" onClick={closeMenus} className={({ isActive }) => (isActive ? "active" : "")}>
                                        Избранные
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/completedplans" onClick={closeMenus} className={({ isActive }) => (isActive ? "active" : "")}>
                                        Выполненные
                                    </NavLink>
                                </li>
                            </ul>                 
                        </li>
                        <li>
                            <NavLink to="/plansconstructor" onClick={closeMenus} className={({ isActive }) => (isActive ? "active" : "")}>
                                Редактор планов
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/chat" onClick={closeMenus} className={({ isActive }) => (isActive ? "active" : "")}>
                                Чат
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/statistics" onClick={closeMenus} className={({ isActive }) => (isActive ? "active" : "")}>
                                Статистика
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="nav-container-right">
                    <AuthNavbar />
                </div>               
            </div>
        </nav>
    );
};
