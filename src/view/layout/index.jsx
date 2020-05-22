import React, { Component } from 'react';
import { Link } from "react-router-dom"
import './index.less'
class Layout extends Component {
  render() {
    return (
      <div className="contion">
                    <div><Link to="/home">home</Link></div>
                    <div><Link to="/detail">detail</Link></div>
                    <div><Link to="/shopp">shopp</Link></div>
          {
            this.props.children
          }
      </div>
    );
  }
}

export default Layout;
