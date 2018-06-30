import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar indigo darken-3">
        <div className="container">
          <a href="" className="brand-logo">
            Todo <i className="material-icons icon-check">check_circle</i>
          </a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
