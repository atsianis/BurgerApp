import React from 'react';
import Item from './Item/Item';
import classes from './NavigationItems.css';

const navigationitems = (props) =>(
    <ul className={classes.NavigationItems}>
        <Item link="/" exact>Burger Builder</Item>
        {props.isAuth ? <Item link="/orders">My Orders</Item>: null}
        { props.isAuth ? <Item link="/logout">Logout</Item> 
            : <Item link="/auth">Authenticate</Item>}
    </ul>
);

export default navigationitems;