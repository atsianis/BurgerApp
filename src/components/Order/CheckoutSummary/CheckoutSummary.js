import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';

const checkoutSummary= (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tasts well!</h1>
            <div style={{width: '300px', margin: 'auto'}}></div>
            <Burger ingredients={props.ingredients}/>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;