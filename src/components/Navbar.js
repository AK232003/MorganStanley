import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, NavItem, Nav, Collapse, NavbarToggler, NavbarBrand, Navlink } from 'reactstrap'
import {MdMarkUnreadChatAlt} from 'react-icons/md'
import logo from "../logo_scroll.png"
import { FaBars } from "react-icons/fa";

const NavBar = ({user,open,setOpen,toggle}) => {

    return (
    <Navbar className="!bg-sideBarColor1 h-20 shadow-md">
        <div className={`h-14 w-14 ${!open && "row"} md:!hidden z-0 relative left-5 ${open&& "opacity-0"} overflow-hidden z-3 me-2`}>
          <FaBars className="h-14 w-14  p-1 cursor-pointer text-textcolor visible" onClick={() =>{ setOpen(!open); toggle(true)}}></FaBars>
    </div>
        <NavbarBrand ><img alt="logo" src={logo} width="100%" className="h-12 ms-4 p-1"></img></NavbarBrand>
        <Nav className="mr-auto">
            <NavItem></NavItem>
        </Nav>
        <Nav>
            <NavItem className="flex"><MdMarkUnreadChatAlt className="float-left text-xl"/>Alerts</NavItem>
        </Nav>
    </Navbar>
    )
}

export default NavBar;