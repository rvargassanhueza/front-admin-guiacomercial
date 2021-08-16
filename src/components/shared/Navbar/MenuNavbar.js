import React from "react"
import { Link } from "react-router-dom"
import * as AiIcons from "react-icons/ai"
import { SidebarData } from "./SidebarData"
import ListItemNavbar from "./ListItemNavbar"

const MenuNavbar = ({ sidebar, showSidebar }) => {
    return (
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                    <AiIcons.AiOutlineClose />
                </Link>
                </li>
                {
                    SidebarData.map( (item, index) => (
                        <ListItemNavbar key={index} item={item} />
                    ))
                }
            </ul>
        </nav>
    );
};

export default MenuNavbar;
