import React from "react";
import Enzyme from "enzyme";
Enzyme.configure({ adapter: new Adapter() });


const logout = require('../components/Header');


test("test_logout", async function(){

    const btn = screen.getByRole('button', {name: 'Logout'});
    expect(wrapper.find(btn).simulate('click')).toBe(true);
    
})