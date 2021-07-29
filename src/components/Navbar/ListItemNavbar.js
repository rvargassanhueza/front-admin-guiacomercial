import React from "react"
import { Link } from "react-router-dom"

const ListItemNavbar = ({item}) => {

    const { cName, path, icon, title } = item; 

    return (
        <li className={cName}>
            <Link to={path}>
                {icon}<span>{title}</span>
            </Link>
        </li>
    );
};

export default ListItemNavbar;
