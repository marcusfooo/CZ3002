import React from "react";
import Enzyme from "enzyme";
import { planningAreas } from "../planningArea";
import { createSearchParams, useNavigate } from "react-router-dom";



const FilterForm = require('../components/FilterForm');

Enzyme.configure({ adapter: new Adapter() });

test("test_filter_search_1", async function(){

    const navigate = useNavigate();
    data = {
        locationOptions : "Ang Mo Kio",
        typeOptions : "unit",
        numberOptions : "1"}

    expect(onSearch(data)).toThrow().not()

    const wrapper = Enzyme.mount(
        < FilterForm
         locationOptions={data.location}
         typeOptions={data.typeOptions}
         numberOptions={data.numberOptions}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).not.toBe();
    
})

test("test_filter_search_2", async function(){

    const navigate = useNavigate();
    data = {
        locationOptions : "Ang Mo Kio",
        typeOptions : "",
        numberOptions : "1"}

    expect(onSearch(data)).toThrow().not()

    const wrapper = Enzyme.mount(
        < FilterForm
         locationOptions={data.location}
         typeOptions={data.typeOptions}
         numberOptions={data.numberOptions}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).not.toBe();
    
})

test("test_filter_search_3", async function(){

    const navigate = useNavigate();
    data = {
        locationOptions : "Ang Mo Kio",
        typeOptions : "unit",
        numberOptions : ""}

    expect(onSearch(data)).toThrow().not()

    const wrapper = Enzyme.mount(
        < FilterForm
         locationOptions={data.location}
         typeOptions={data.typeOptions}
         numberOptions={data.numberOptions}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).not.toBe();
    
})

test("test_filter_search_4", async function(){

    const navigate = useNavigate();
    data = {
        locationOptions : "Ang Mo Kio",
        typeOptions : "",
        numberOptions : ""}

    expect(onSearch(data)).toThrow().not()

    const wrapper = Enzyme.mount(
        < FilterForm
         locationOptions={data.location}
         typeOptions={data.typeOptions}
         numberOptions={data.numberOptions}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).not.toBe();
    
})

test("test_filter_search_5", async function(){

    const navigate = useNavigate();
    data = {
        locationOptions : "",
        typeOptions : "unit",
        numberOptions : ""}

    expect(onSearch(data)).toThrow().not()

    const wrapper = Enzyme.mount(
        < FilterForm
         locationOptions={data.location}
         typeOptions={data.typeOptions}
         numberOptions={data.numberOptions}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).not.toBe();
    
})

test("test_filter_search_6", async function(){

    const navigate = useNavigate();
    data = {
        locationOptions : "",
        typeOptions : "",
        numberOptions : "1"}

    expect(onSearch(data)).toThrow().not()

    const wrapper = Enzyme.mount(
        < FilterForm
         locationOptions={data.location}
         typeOptions={data.typeOptions}
         numberOptions={data.numberOptions}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).not.toBe();
    
})

test("test_filter_search_7", async function(){

    const navigate = useNavigate();
    data = {
        locationOptions : "",
        typeOptions : "",
        numberOptions : ""}

    expect(onSearch(data)).toThrow().not()

    const wrapper = Enzyme.mount(
        < FilterForm
         locationOptions={data.location}
         typeOptions={data.typeOptions}
         numberOptions={data.numberOptions}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).not.toBe();
    
})