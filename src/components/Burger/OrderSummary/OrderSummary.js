import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingKey => {
            return <li key={ingKey}><span style={{textTranfrom: 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]}</li>
        });
    return(
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger wih the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CΟNTINUE</Button>
        </Aux>
    )
};

export default orderSummary;