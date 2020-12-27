import React, { Component } from "react";
import {connect} from 'react-redux'
import axios from "../../axios-orders";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
  // We have olny left here the state that is related to UI
  // UI state stays in the component
  // Generally demanded data is moved in Redux
  state = {
    purchasing: false
  };

  componentDidMount(){
    this.props.onInit();
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
    if (this.props.isAuthenticated){
      this.setState({ purchasing: true });
    }else{
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
    
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinuehandler = () => {
    this.props.onInitPurchase();
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

    let burger = this.props.error ? <p>Can't load ingredients !</p> : <Spinner/>;
    if (this.props.ings){
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            isAuth = {this.props.isAuthenticated}
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
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  } 
}

const mapDispatchToProps = dispatch => {
  return{
    onIngredientAdded: (ingName)=> dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName)=> dispatch(actions.removeIngredient(ingName)),
    onInit: ()=> dispatch(actions.initIngredients()),
    onInitPurchase: ()=> dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path)=> dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
