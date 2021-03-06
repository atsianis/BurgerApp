import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  //Object.keys returns an array with the keys of the objects
  // we are tranforming an object into an array of BurgerIngredient components
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingKey) => {
      // Array(n) returns an array of length n with empty elements
      // we create an array of length equal to the amount of the current ingredient (ingKey)
      // and then we map it to an array of equal length populated with the corresponding ingredients
      return [...Array(props.ingredients[ingKey])].map((_, i) => (
        <BurgerIngredient key={ingKey + i} type={ingKey} />
      ));
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
        {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
