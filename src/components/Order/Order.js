import React from 'react';
import classes from './Order.css'

const order = (props) =>{

    const ingredients =[];

    for (let ingredientName in props.ingredients){
        ingredients.push({name:ingredientName, amount: props.ingredients[ingredientName],})
    }

    const ingredientOutput = ingredients.map( ig => {
        return (
        <span 
            style={
                {textTransfrom: 'capitalize', 
                display: 'inine-block',
                margin: '0 8px', 
                border: '1px solid #ccc', 
                padding: '8px'}
            } 
            key={ig.name}
        >
                {ig.name} ({ig.amount})
        </span>)
    })

    return(
    </div>
    )
};

export default order;