import React, { Component } from "react";
import {connect} from 'react-redux'
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
  // We have olny left here the state that is related to UI
  // UI state stays in the component
  // Generally demanded data is moved in Redux
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount(){
    axios.get('https://burgerapp-fd190-default-rtdb.firebaseio.com/ingredients.json')
      .then(response=> {
        this.setState({ingredients: response.data})
      })
      .catch(err => this.setState({error:true}))
  }

  updatePurchasableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((ingkey) => {
        return ingredients[ingkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0 ;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinuehandler = () => {
    this.props.history.push('/checkout');
  };
  
  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Can't load ingredients !</p> : <Spinner/>;
    if (this.state.ingredients){
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchasableState(this.props.ings)}
            purchase={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.price}
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinuehandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner/>;
    }
    

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return{
    ings: state.ingredients,
    price: state.totalPrice
  };
}

const mapDispatchToProps = dispatch => {
  return{
    onIngredientAdded: (ingName)=> dispatch({type: actionTypes.ADD_INGREDIENT, payload: ingName}),
    onIngredientRemoved: (ingName)=> dispatch({type: actionTypes.REMOVE_INGREDIENT, payload: ingName})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
