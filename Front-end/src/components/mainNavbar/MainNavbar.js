import React from "react";
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import { Link } from 'react-router-dom'

const MainNavbar = (props) => {
  const { navLinks, isOpen, toggle } = props;
  return (
    <div className="col" id="mainMenu">
      <div className="header-nav header-nav-bg-color-default">
        <div className="header-nav-wrapper">
          <Container>
            <Row>
              <div className="col-12">
                <div className="primary-nav">
                  <div className="primary-nav-wrapper">
                    <nav className="mega-menu">
                      <div className="menu-list-items">
                        <Navbar light expand="md" className="front_menu">
                          <NavbarToggler onClick={() => toggle} />
                          <Collapse isOpen={isOpen} navbar>
                            {navLinks.map((navLink, index) => (
                              <Nav className="ml-auto" navbar key={index}>
                                <NavItem>
                                  <Link to={navLink.path}  onClick={() => console.log("clicked")}>
                                    {navLink.menu_title}
                                  </Link>
                                </NavItem>
                              </Nav>
                            ))}
                          </Collapse>
                        </Navbar>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
