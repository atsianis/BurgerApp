import React from "react";
import classes from "./item.css";
import {NavLink} from 'react-router-dom'

const item = (props) => (
  <li className={classes.Item}>
    <NavLink to={props.link} exact={props.exact} activeClassName={classes.active}>
      {props.children}
    </NavLink>
  </li>
);

export default item;
