import React, {Component} from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {

    //Could be a functional component, doesn't have to be a class
    //We did an experient with the lifecycle hook, that's why we turned it into a class

    componentWillUpdate(){
        console.log('will update -- order summara');
    }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map((ingKey) => {
      return (
        <li key={ingKey}>
          <span style={{ textTranfrom: "capitalize" }}>{ingKey}</span>:{" "}
          {this.props.ingredients[ingKey]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your order</h3>
        <p>A delicious burger wih the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CΟNTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
