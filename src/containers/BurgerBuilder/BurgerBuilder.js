import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.3,
  meat: 1.1,
};
class BurgerBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }

  state = {
    totalPrice: 4,
    purchasable: false,
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

  updatPurchasableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((ingkey) => {
        return ingredients[ingkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinuehandler = () => {
    const queryParams = [];
    for(let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price='+this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname:'/checkout',
      search: '?'+queryString
    });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatPurchasableState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatPurchasableState(updatedIngredients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Can't load ingredients !</p> : <Spinner/>;
    if (this.state.ingredients){
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchase={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder, axios);
