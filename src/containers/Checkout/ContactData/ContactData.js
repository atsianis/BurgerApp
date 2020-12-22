import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class contactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: ""
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street'
        },
        value: ""
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your zipcode'
        },
        value: ""
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your country'
        },
        value: ""
      },
      email:{
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: ""
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        }
      }
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
        this.props.history.push("/");
      })
      .catch((error) => {
        //console.log(error);
        this.setState({
          loading: false
        });
      });
  };

  render() {

    const formElementsArray = [];
    for (let key in this.state.orderForm){
      formElementsArray.push({
        id:key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <React.Fragment>
        <h4>Enter your Contact Data</h4>
        <form>
          {formElementsArray.map(formElement => (
            <Input 
              key={formElement.id}
              elementType={formElement.config.elementType} 
              elementConfig={formElement.config.elementConfig} 
              value={formElement.config.value} />
          ))}
          <Button btnType="Success" clicked={this.orderHandler}>
            ORDER
          </Button>
        </form>
      </React.Fragment>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}

export default contactData;
