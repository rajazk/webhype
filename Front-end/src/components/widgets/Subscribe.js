import React, { Component } from "react";
import {
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import BG_Image from "../../assets/images/categories/default/section-banner.jpg";
import SignUp from "../signUp/SignUp";
class Subscribe extends Component {
  state = {
    fieldvalue: {},
    errors: {},
    modal: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      modal: !this.state.modal,
    });
  };

  render() {
    const { modal } = this.state;
    return (
      <div
        className="banner-bg section-ptb"
        style={{ backgroundImage: `url(${BG_Image})` }}
      >
        <Row className="justify-content-center">
          <Col sm={10} lg={6} md={8}>
            <div className="newsletter-wrapper newsletter-style-1 newsletter-design-4">
              <h2 className="newsletter-title">
                Subscribe today and get notifications of new sales!
              </h2>
              <div className="newsletter">
                <Button onClick={this.toggle}>Notification</Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Modal isOpen={modal} toggle={this.toggle} className="modal-lg">
            <ModalHeader toggle={this.toggle} className="noficationModal">
              Notification
            </ModalHeader>
            <ModalBody>
              <SignUp toggle={this.toggle} />
            </ModalBody>
          </Modal>
        </Row>
      </div>
    );
  }
}

export default Subscribe;
