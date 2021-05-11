import React from "react";
import { Link } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarToggler, NavItem } from "reactstrap";

const ToggleNavbar = (props) => {
  const { toggleNavbar, collapsed, navLinks, classset } = props;

  return (
    <Navbar color="faded" light>
      <NavbarToggler onClick={toggleNavbar} className="mr-2" />
      <Collapse isOpen={!collapsed} navbar>
        <Nav className="ml-auto" navbar>
          {navLinks.map((navLink, index) => (
            <li
              key={index}
              className={`nav-item ${
                classset === navLink.menu_title ? "show" : ""
              }`}
            >
              <NavItem>
                <Link to={navLink.path} className="nav-admin-link">
                  {navLink.menu_title}
                </Link>
              </NavItem>
            </li>
          ))}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default ToggleNavbar;
