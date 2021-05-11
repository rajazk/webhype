import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TabPane } from "reactstrap";
import classnames from "classnames";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/login.actions";

const Login = (props) => {
  const { toggle, activeTab, logintoggle, isAuthenticated, isFetching } = props;
  const [login, setLogin] = useState({
    user_name: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    user_name: "",
    password: "",
  });

  const handleChange = (e) => {
    let errorsObj = { ...errors };
    const { name, value } = e.target;
    switch (name) {
      case "user_name":
        errorsObj.user_name = "";
        break;
      case "password":
        errorsObj.password = "";
        break;
      default:
        break;
    }
    setErrors(errorsObj);
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    let errorsObj = { ...errors };
    const { user_name, password } = login;
    if (user_name === "") {
      errorsObj.user_name = "Please enter valid user name!";
    } else {
      errorsObj.user_name = "";
    }
    if (password === "") {
      errorsObj.password = "Please enter valid password!";
    } else {
      errorsObj.password = "";
    }
    e.preventDefault();

    if (user_name && password) {
      props.loginUser(login);
    } else {
      setErrors(errorsObj);
    }
  };

  return (
    <TabPane tabId="1">
      <form>
        <div className="form-group">
          <label>User Name: </label>
          <input
            type="text"
            name="user_name"
            value={login.user_name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter user name"
          ></input>
          {errors.user_name.length > 0 && (
            <span className="error">{errors.user_name}</span>
          )}
        </div>
        <div className="form-group">
          <label>Password </label>
          <input
            type="password"
            name="password"
            value={login.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Password"
          ></input>
          {errors.password.length > 0 && (
            <span className="error">{errors.password}</span>
          )}
        </div>

        {isAuthenticated ? (
          <p style={{ color: "#d65e47" }}>{props.message}</p>
        ) : (
          <p style={{ color: "red" }}>{props.message}</p>
        )}
        <div className="form-group">
          <Link
            className="btn btn-primary mt-1"
            to=""
            onClick={(e) => handleSubmit(e)}
          >
            Log in
          </Link>
          <Link className="btn btn-secondary ml-2 mt-1" onClick={toggle} to="">
            Cancel
          </Link>
        </div>
        {isFetching && (
          <>
            <span>Trying </span>
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          </>
        )}
        <p className="mb-0">
          Don't have account?
          <Link
            to="#"
            className={classnames({
              active: activeTab === "2",
            })}
            onClick={() => {
              logintoggle("2");
            }}
          >
            Register
          </Link>
          here
        </p>
      </form>
    </TabPane>
  );
};

function mapState(state) {
  const { isAuthenticated, isFetching, message } = state.auth.authentication;
  return { isAuthenticated, isFetching, message };
}

const actionCreators = {
  loginUser: loginUser,
};

export default connect(mapState, actionCreators)(Login);
