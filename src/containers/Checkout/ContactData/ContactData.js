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
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street'
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your zipcode'
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your country'
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      email:{
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
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

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault(); // because the button is in the form
    
    const data = {};
    for (let formElementIdentifier in this.state.orderForm){
      data[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    this.setState({
      loading: true,
    });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      data: data
    }

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

  inputChangedHandler =(event, inputIdentifier) => {
    // implementing deep cloning of state object which consists of nested objects
    const updatedOrderForm= {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    }
    ///////////////////////////////////////////////////////////////////////////
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({
      orderForm:updatedOrderForm
    });

  }

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
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(formElement => (
            <Input 
              key={formElement.id}
              elementType={formElement.config.elementType} 
              elementConfig={formElement.config.elementConfig} 
              value={formElement.config.value}
              invalid = {!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              changed={(event)=>this.inputChangedHandler(event, formElement.id)}/>
          ))}
          <Button btnType="Success">
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
