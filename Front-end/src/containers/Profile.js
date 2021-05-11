/**
 *  Admin Profile Page
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Common1 from "../components/utilities/profile";
import AdminProfileDetail from "../components/widgets/AdminProfileDetail";
import Adminsitebar from "../components/Adminsitebar";

class Profile extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")),
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const Profile = Common1["0"]["profile"];
    const { user } = this.state;
    return (
      <div className="section-ptb">
        <Container>
          <Row>
            <Adminsitebar />
            <Col lg={9} className="mt-4 mt-lg-0">
              <Row>
                <Col lg={12}>
                  <div className="woocommerce-Address">
                    <div className="woocommerce-Address-title">
                      <h5 class="mb-0">Profile Information</h5>
                    </div>
                    <div className="woocommerce-Address-info mt-4">
                      <ul class="list-unstyled mb-0">
                        <li>
                          <span>First name:</span>
                          <strong>{user && user.first_name}</strong>
                        </li>
                        <li>
                          <span>Last name:</span>
                          <strong>{user && user.last_name}</strong>
                        </li>
                        <li>
                          <span>Password:</span>
                          <strong>{user && user.password}</strong>
                        </li>
                        <li>
                          <span>Address:</span>
                          <strong>{user && user.address}</strong>
                        </li>
                        <li>
                          <span>Email:</span>
                          <strong>{user && user.email}</strong>
                        </li>
                        <li>
                          <span>User Name:</span>
                          <strong>{user && user.user_name}</strong>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Profile;
