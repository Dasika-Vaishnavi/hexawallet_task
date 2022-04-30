import React from "react";

export class Register extends React.Component {
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
          </div>
          <form action="http://localhost:8080/signup" method="post">
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="Username" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Wallet-name</label>
              <input type="text" name="email" placeholder="Wallet-name" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Wallet-Id</label>
              <input type="text" name="wallet" placeholder="Wallet-Id" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Profile Picture</label>
              <input type="file" name="profile" placeholder="Password" />
            </div>
            <button type="submit" className="btn">
              Register
            </button>
          </div>
          </form>
        </div>
      </div>
    );
  }
}