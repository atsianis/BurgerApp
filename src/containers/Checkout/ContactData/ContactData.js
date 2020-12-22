import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from '../../../axios-orders';

class contactData extends Component {
  state = {
    name: "",
    email: "",
    adderess: {
      street: "",
      postalCode: "",
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault(); // because the button is in the form
    console.log(this.props.ingredients);
    
    this.setState({
      loading: true,
    });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Thanos",
        address: {
          street: "Test Street 24",
          zipCode: "43243",
          country: "Greece",
        },
        email: "thanos@gmail.com",
      },
      deliveryMethod: "fast shipping",
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        //console.log(response);
        this.setState({
          loading: false
        });
      })
      .catch((error) => {
        //console.log(error);
        this.setState({
          loading: false
        });
      });
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="Your name"
          />
          <input
            className={classes.Input}
            type="email"
            name="email"
            placeholder="Your email"
          />
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="Your street"
          />
          <input
            className={classes.Input}
            type="text"
            name="postal"
            placeholder="Your postal code"
          />
          <Button btnType="Success" clicked={this.orderHandler}>
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default contactData;
