import React from "react";
import Enzyme from "enzyme";


const NewListing = require('../components/NewListing');

test("test_create_listing_success", async function(){

    const listingSchema = {
                        title: "JE 2 room flat",
                        postalCode: 636908,
                        location: "Jurong Easter",
                        isRoom: True,
                        description: "no aircon, close to MRT, fees included",
                        price: 10000,
                        numRooms: 3
                        }

    const wrapper = Enzyme.mount(
        <NewListing 
            title = {listingSchema.title}
            postalCode = {listingSchema.postalCode}
            location = {listingSchema.location}
            isRoom = {listingSchema.isRoom}
            description = {listingSchema.description}
            price = {listingSchema.price}
            numRooms = {listingSchema.numRooms}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).not.toBe(true);
    
})


test("test_create_title_invalid", async function(){

    const listingSchema = {
                        title: "JE 2 room flat word placeholder xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\
                                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\
                                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                        postalCode: 123456,
                        location: "Jurong Eastern",
                        isRoom: True,
                        description: "no aircon, close to MRT, fees included",
                        price: 10000,
                        numRooms: 3
                        }

    const wrapper = Enzyme.mount(
        <NewListing 
            title = {listingSchema.title}
            postalCode = {listingSchema.postalCode}
            location = {listingSchema.location}
            isRoom = {listingSchema.isRoom}
            description = {listingSchema.description}
            price = {listingSchema.price}
            numRooms = {listingSchema.numRooms}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).toBe(true);
    
})



test("test_create_postalcode_invalid", async function(){

    const listingSchema = {
                        title: "JE 2 room flat",
                        postalCode: 636809,
                        location: "Jurong Eastern",
                        isRoom: True,
                        description: "no aircon, close to MRT, fees included",
                        price: 10000,
                        numRooms: 3
                        }

    const wrapper = Enzyme.mount(
        <NewListing 
            title = {listingSchema.title}
            postalCode = {listingSchema.postalCode}
            location = {listingSchema.location}
            isRoom = {listingSchema.isRoom}
            description = {listingSchema.description}
            price = {listingSchema.price}
            numRooms = {listingSchema.numRooms}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).toBe(true);
    
})



test("test_create_description_long", async function(){

    const listingSchema = {
                        title: "JE 2 room flat",
                        postalCode: 123456,
                        location: "Jurong Eastern",
                        isRoom: True,
                        description: "no aircon, close to MRT, fees included\
                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\
                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\
                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\
                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\
                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\
                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                        price: 10000,
                        numRooms: 3
                        }

    const wrapper = Enzyme.mount(
        <NewListing 
            title = {listingSchema.title}
            postalCode = {listingSchema.postalCode}
            location = {listingSchema.location}
            isRoom = {listingSchema.isRoom}
            description = {listingSchema.description}
            price = {listingSchema.price}
            numRooms = {listingSchema.numRooms}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).toBe(true);
    
})



test("test_create_price_negative", async function(){

    const listingSchema = {
                        title: "JE 2 room flat",
                        postalCode: 636809,
                        location: "Jurong Eastern",
                        isRoom: True,
                        description: "no aircon, close to MRT, fees included",
                        price: -10000,
                        numRooms: 3
                        }

    const wrapper = Enzyme.mount(
        <NewListing 
            title = {listingSchema.title}
            postalCode = {listingSchema.postalCode}
            location = {listingSchema.location}
            isRoom = {listingSchema.isRoom}
            description = {listingSchema.description}
            price = {listingSchema.price}
            numRooms = {listingSchema.numRooms}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).toBe(true);
    
})

test("test_create_price_invalid", async function(){

    const listingSchema = {
                        title: "JE 2 room flat",
                        postalCode: 636809,
                        location: "Jurong Eastern",
                        isRoom: True,
                        description: "no aircon, close to MRT, fees included",
                        price: "haha",
                        numRooms: 3
                        }

    const wrapper = Enzyme.mount(
        <NewListing 
            title = {listingSchema.title}
            postalCode = {listingSchema.postalCode}
            location = {listingSchema.location}
            isRoom = {listingSchema.isRoom}
            description = {listingSchema.description}
            price = {listingSchema.price}
            numRooms = {listingSchema.numRooms}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).toBe(true);
    
})

test("test_create_price_decimal", async function(){

    const listingSchema = {
                        title: "JE 2 room flat",
                        postalCode: 636809,
                        location: "Jurong Eastern",
                        isRoom: True,
                        description: "no aircon, close to MRT, fees included",
                        price: 123.56,
                        numRooms: 3
                        }

    const wrapper = Enzyme.mount(
        <NewListing 
            title = {listingSchema.title}
            postalCode = {listingSchema.postalCode}
            location = {listingSchema.location}
            isRoom = {listingSchema.isRoom}
            description = {listingSchema.description}
            price = {listingSchema.price}
            numRooms = {listingSchema.numRooms}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).toBe(true);
    
})

test("test_create_price_zero", async function(){

    const listingSchema = {
                        title: "JE 2 room flat",
                        postalCode: 636809,
                        location: "Jurong Eastern",
                        isRoom: True,
                        description: "no aircon, close to MRT, fees included",
                        price:0,
                        numRooms: 3
                        }

    const wrapper = Enzyme.mount(
        <NewListing 
            title = {listingSchema.title}
            postalCode = {listingSchema.postalCode}
            location = {listingSchema.location}
            isRoom = {listingSchema.isRoom}
            description = {listingSchema.description}
            price = {listingSchema.price}
            numRooms = {listingSchema.numRooms}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).toBe(true);
    
})

test("test_create_empty_isRoom", async function(){

    const listingSchema = {
                        title: "JE 2 room flat",
                        postalCode: 636809,
                        location: "Jurong Eastern",
                        isRoom: '',
                        description: "no aircon, close to MRT, fees included",
                        price:0,
                        numRooms: 3
                        }

    const wrapper = Enzyme.mount(
        <NewListing 
            title = {listingSchema.title}
            postalCode = {listingSchema.postalCode}
            location = {listingSchema.location}
            isRoom = {listingSchema.isRoom}
            description = {listingSchema.description}
            price = {listingSchema.price}
            numRooms = {listingSchema.numRooms}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).toBe(true);
    
})

test("test_create_empty_numRooms", async function(){

    const listingSchema = {
                        title: "JE 2 room flat",
                        postalCode: 636809,
                        location: "Jurong Eastern",
                        isRoom: True,
                        description: "no aircon, close to MRT, fees included",
                        price:0,
                        numRooms: ''
                        }

    const wrapper = Enzyme.mount(
        <NewListing 
            title = {listingSchema.title}
            postalCode = {listingSchema.postalCode}
            location = {listingSchema.location}
            isRoom = {listingSchema.isRoom}
            description = {listingSchema.description}
            price = {listingSchema.price}
            numRooms = {listingSchema.numRooms}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).toBe(true);
    
})