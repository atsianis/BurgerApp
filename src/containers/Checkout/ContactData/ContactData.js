import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from '../../../components/UI/Input/Input';

class contactData extends Component {
  state = {
    name: "",
    email: "",
    adderess: {
      street: "",
      postalCode: "",
    },
    loading: false,
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
        this.props.history.push('/');
      })
      .catch((error) => {
        //console.log(error);
        this.setState({
          loading: false
        });
      });
  };

  render() {
    let form = (
      <React.Fragment>
        <h4>Enter your Contact Data</h4>
        <form>
          <Input
            type="input"
            type="text"
            name="name"
            placeholder="Your name"
          />
          <Input
            type="input"
            type="email"
            name="email"
            placeholder="Your email"
          />
          <Input
            type="input"
            type="text"
            name="street"
            placeholder="Your street"
          />
          <Input
            type="input"
            type="text"
            name="postal"
            placeholder="Your postal code"
          />
          <Button btnType="Success" clicked={this.orderHandler}>
            ORDER
          </Button>
        </form>
      </React.Fragment>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
        <div className={classes.ContactData}>
            {form}
        </div>
    );
  }
}

export default contactData;
