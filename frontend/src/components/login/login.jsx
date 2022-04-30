import React from "react";
import loginImg from "../../login.svg";

export class Login extends React.Component {
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <form action="http://localhost:8080/login" method="post">
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Wallet-name</label>
              <input type="text" name="username" placeholder="Wallet-name" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Wallet-Id</label>
              <input type="password" name="wallet" placeholder="Wallet-Id" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Password" />
            </div>
            <button type="submit" className="btn">
              Login
            </button>
          </div>
          </form>
        </div>
      </div>
    );
  }
}