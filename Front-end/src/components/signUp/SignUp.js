import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TabPane, Col, Row } from "reactstrap";
import classnames from "classnames";
import { connect } from "react-redux";
import { register } from "../../store/actions/login.actions";

const validEmailRegex = RegExp(
  /^(([^<>()\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
);

const SignUp = (props) => {
  const { activeTab, toggle, logintoggle } = props;
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    address: "",
    user_name: "",
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    address: "",
    user_name: "",
  });

  const handleChange = (e) => {
    let errorsObj = { ...errors };
    const { name, value } = e.target;
    switch (name) {
      case "first_name":
        errorsObj.first_name = "";
        break;
      case "last_name":
        errorsObj.last_name = "";
        break;
      case "email":
        errorsObj.email = validEmailRegex.test(value)
          ? ""
          : "Email is not valid!";
        break;
      case "password":
        errorsObj.password = "";
        break;
      case "confirm_password":
        errorsObj.confirm_password = "";
        break;
      case "address":
        errorsObj.address = "";
        break;
      case "user_name":
        errorsObj.user_name = "";
        break;
      default:
        break;
    }
    setErrors(errorsObj);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    let errorsObj = { ...errors };
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      address,
      user_name,
    } = user;
    if (first_name === "") {
      errorsObj.first_name = "Please enter valid first name!";
    } else {
      errorsObj.first_name = "";
    }
    if (last_name === "") {
      errorsObj.last_name = "Please enter valid last name!";
    } else {
      errorsObj.last_name = "";
    }
    if (email === "") {
      errorsObj.email = "Please enter valid email!";
    } else {
      errorsObj.email = "";
    }
    if (password === "") {
      errorsObj.password = "Please enter valid password!";
    } else {
      errorsObj.password = "";
    }
    if (confirm_password === "") {
      errorsObj.confirm_password = "Please enter valid confrim password!";
    } else {
      errorsObj.confirm_password = "";
    }
    if (address === "") {
      errorsObj.address = "Please enter valid address!";
    } else {
      errorsObj.address = "";
    }
    if (user_name === "") {
      errorsObj.user_name = "Please enter valid user name!";
    } else {
      errorsObj.user_name = "";
    }

    if (
      first_name &&
      last_name &&
      email &&
      password === confirm_password &&
      address &&
      user_name
    ) {
      props.register(user);
    } else if (password !== confirm_password) {
      errorsObj.confirm_password = "Please enter same password!";
      setErrors(errorsObj);
    } else {
      setErrors(errorsObj);
    }
  };

  const { isFetching, isFetched, message } = props;

  return (
    <TabPane tabId="2">
      <form>
        <Row>
          <Col md="6">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                value={user.first_name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter First Name"
              ></input>
              {errors.first_name.length > 0 && (
                <span className="error">{errors.first_name}</span>
              )}
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label>Last Name </label>
              <input
                type="text"
                name="last_name"
                value={user.last_name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Last Name"
              ></input>
              {errors.last_name.length > 0 && (
                <span className="error">{errors.last_name}</span>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <div className="form-group">
              <label>Email address</label>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Email"
              ></input>
              {errors.email.length > 0 && (
                <span className="error">{errors.email}</span>
              )}
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label>Password </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Password"
              ></input>
              {errors.password.length > 0 && (
                <span className="error">{errors.password}</span>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                value={user.confirm_password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Confirm Password"
              ></input>
              {errors.confirm_password.length > 0 && (
                <span className="error">{errors.confirm_password}</span>
              )}
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label>User Name </label>
              <input
                type="text"
                name="user_name"
                value={user.user_name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter User Name"
              ></input>
              {errors.user_name.length > 0 && (
                <span className="error">{errors.user_name}</span>
              )}
               {!isFetched && message && (
                <span className="error">{message}</span>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Address"
              ></input>
              {errors.address.length > 0 && (
                <span className="error">{errors.address}</span>
              )}
            </div>
          </Col>
        </Row>
        {isFetched && (
          <p style={{ color: "#d65e47" }}>User Successfully Registered!</p>
        )}
        <div className="form-group">
          <Link className="btn btn-primary" onClick={handleRegister} to="">
            Register
          </Link>
          <Link className="btn btn-secondary ml-2" onClick={toggle} to="">
            Cancel
          </Link>
        </div>
        {isFetching && (
          <>
            <span>Registering </span>
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          </>
        )}
        <p className="mb-0">
          Already have account?
          <Link
            to="#"
            className={classnames({
              active: activeTab === "1",
            })}
            onClick={() => {
              logintoggle("1");
            }}
          >
            SignIn
          </Link>
          here
        </p>
      </form>
    </TabPane>
  );
};

const mapStateToProps = (state) => {
  const { isFetching, isFetched, message } = state.auth.registration;
  return { isFetching, isFetched, message };
};

const mapDispatchToProps = {
  register: register,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
