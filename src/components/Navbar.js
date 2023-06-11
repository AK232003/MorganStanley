import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { Navbar, NavItem, Nav, NavbarBrand, Dropdown,DropdownToggle,DropdownItem,DropdownMenu } from 'reactstrap'
// import {MdMarkUnreadChatAlt} from 'react-icons/md'
import logo from "../logo_scroll.png"
import { FaBars } from "react-icons/fa";
import i18next from "i18next";

const NavBar = ({user,id,name,open,setOpen,toggle}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropDown = () => setDropdownOpen((prevState) => !prevState);
    return (
    <Navbar className="!bg-sideBarColor2 h-16">
        <div className={`h-14 w-14 ${!open && "row"} md:!hidden z-0 relative left-0 md:left-5 top-1 md:top-0 ${open&& "opacity-0"} overflow-hidden z-3 me-2`}>
          <FaBars className="md:h-14 md:w-14 h-8 w-8  p-1 cursor-pointer text-sideBarColor1 visible" onClick={() =>{ setOpen(!open); toggle(true)}}></FaBars>
    </div>
        <NavbarBrand tag="div"><NavLink to={user}><img alt="logo" src={logo} width="90%" className="md:h-12 h-10 md:ms-3 ms:2 p-1"></img></NavLink></NavbarBrand>
        <Nav className="ms-auto text-white">
            
            <NavItem className="mx-2">{id} </NavItem>
            <NavItem className="mx-2">{user} </NavItem>
        </Nav>
        {/* <Nav>
            <NavItem className="flex text-2xl align-middle"><MdMarkUnreadChatAlt className="float-left align-bottom"/>Alerts</NavItem>
        </Nav> */}
    </Navbar>
    )
}

export default NavBar;