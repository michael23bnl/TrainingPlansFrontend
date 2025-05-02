import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import AuthNavbar from "./auth_navbar/AuthNavbar";
import './Navbar.css'
export const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return <nav>
        <div className="title">logo</div>
        <div className="menu" onClick={() => {
            setMenuOpen(!menuOpen);
        }}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
            <li>
                <Link to={"/"}>Главная</Link>
            </li>
            <li>
                <NavLink to={"/preparedplans"} 
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Планы
                </NavLink>
            </li>
            <li>
                <NavLink to={"/myplans"}
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Мои планы
                </NavLink>
            </li>
            <li>
                <NavLink to={"/favoriteplans"}
                className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Избранные планы
                </NavLink>
            </li>
            <li>
                <NavLink to={"/plansconstructor"}
                className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Редактор планов
                </NavLink>
            </li>
            <li>
                <NavLink to={"/chat"}
                className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Чат
                </NavLink>
            </li>
            <li>
                <NavLink to={"/statistics"}
                className={({ isActive }) => (isActive ? "active" : "")}
                >
                    Статистика
                </NavLink>
            </li>
        </ul>      
        <AuthNavbar />       
    </nav>;
};