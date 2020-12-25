import React from 'react';
import Item from './Item/Item';
import classes from './NavigationItems.css';

const navigationitems = () =>(
    <ul className={classes.NavigationItems}>
        <Item link="/" exact>Burger Builder</Item>
        <Item link="/orders">My Orders</Item>
        <Item link="/auth">Authenticate</Item>
    </ul>
);

export default navigationitems;