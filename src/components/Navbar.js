import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, NavItem, Nav, NavbarBrand } from 'reactstrap'
// import {MdMarkUnreadChatAlt} from 'react-icons/md'
import logo from "../logo_scroll.png"
import { FaBars } from "react-icons/fa";

const NavBar = ({user,open,setOpen,toggle}) => {

    return (
    <Navbar className="!bg-sideBarColor1 md:h-20 h-14  shadow-md">
        {user!=="groundWorker" && 
        <div className={`h-14 w-14 ${!open && "row"} md:!hidden z-0 relative left-2 md:left-5 top-1 md:top-0 ${open&& "opacity-0"} overflow-hidden z-3 me-2`}>
          <FaBars className="md:h-14 md:w-14 h-8 w-8  p-1 cursor-pointer text-textcolor visible" onClick={() =>{ setOpen(!open); toggle(true)}}></FaBars>
    </div>
        }
        <NavbarBrand tag="div"><NavLink to={user}><img alt="logo" src={logo} width="100%" className="h-12 ms-4 p-1"></img></NavLink></NavbarBrand>
        <Nav className="mr-auto">
            <NavItem></NavItem>
        </Nav>
        {/* <Nav>
            <NavItem className="flex text-2xl align-middle"><MdMarkUnreadChatAlt className="float-left align-bottom"/>Alerts</NavItem>
        </Nav> */}
    </Navbar>
    )
}

export default NavBar;