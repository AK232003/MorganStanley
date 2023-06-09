import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, NavItem, Nav, Collapse, NavbarToggler, NavbarBrand, Navlink } from 'reactstrap'
import {MdMarkUnreadChatAlt} from 'react-icons/md'

const NavBar = ({user}) => {

    return (
        <div>
            <Navbar className="!bg-sideBarColor1">
                <NavbarBrand href="/admin">Dashboard</NavbarBrand>
                <Nav className="mr-auto">
                    <NavItem>hello</NavItem>
                </Nav>
                <Nav>
                    <NavItem className="flex"><MdMarkUnreadChatAlt/>Alerts</NavItem>
                </Nav>
                
            </Navbar>
        </div>
    )
}

export default NavBar;