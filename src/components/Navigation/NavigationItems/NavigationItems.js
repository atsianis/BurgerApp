import React from 'react';
import Item from './Item/Item';
import classes from './NavigationItems.css';

const navigationitems = () =>(
    <ul className={classes.NavigationItems}>
        <Item link="/" active>Burger Builder</Item>
        <Item link="/">Checkout</Item>
    </ul>
);

export default navigationitems;