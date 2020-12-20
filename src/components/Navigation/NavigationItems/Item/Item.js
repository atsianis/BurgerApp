import React from "react";
import { ProgressPlugin } from "webpack";
import navigationitems from "../NavigationItems";
import classes from "./item.css";

const item = (props) => (
  <li className={classes.Item}>
    <a href={props.link} className={props.active ? classes.active : null}>
      {props.children}
    </a>
  </li>
);

export default navigationitems;
