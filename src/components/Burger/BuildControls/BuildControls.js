import React from "react";
import classes from "./BuildControls.css";
import Control from "./Control/Control";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      {" "}
      Current Price: <strong>${props.price.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl) => (
      <Control
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      disabled={!props.purchasable}
      className={classes.OrderButton}
      onClick={props.purchase}
    >
      ORDER NOW
    </button>
  </div>
);

export default buildControls;
