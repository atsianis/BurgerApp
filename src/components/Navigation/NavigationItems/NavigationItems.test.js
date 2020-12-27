import {configure, shallow}  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import Item from './Item/Item';
import React from 'react';

configure({adapter: new Adapter()})

describe('<NavigationItems/>', ()=>{

    let wrapper;
    beforeEach( ()=> {
        wrapper = shallow(<NavigationItems/>)
    })

    it('should render two <Item/> elements if not authenticated', ()=>  {
        expect(wrapper.find(Item)).toHaveLength(2);
    });

    it('should render three <Item/> elements if authenticated', ()=>  {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(Item)).toHaveLength(3);
    });

    it('should render one <Item link="logout"/> element if authenticated', ()=>  {
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<Item link="/logout">Logout</Item>)).toEqual(true);
    });
})