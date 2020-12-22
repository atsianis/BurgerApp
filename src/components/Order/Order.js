import React from 'react';
import classes from './Order.css'

const order = (props) =>{

    const ingredients =[];

    for (let ingredientName in props.ingredients){
        ingredients.push({name:ingredientName, amount: props.ingredients[ingredientName],})
    }


    return(
    </div>
    )
};

export default order;