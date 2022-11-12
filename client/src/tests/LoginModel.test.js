// import Adapter from "enzyme-adapter-react-16";
import React from "react";
import Enzyme from "enzyme";


const LoginModal = require('../components/LoginModal');

Enzyme.configure({ adapter: new Adapter() });

test("test_signup_email_empty", async function(){

    const test_account = {
                        email: "",
                        password: "123456789",
                        passwordConfirm: "123456789"    
                        }

    const btn = screen.getByRole('button', {name: 'Signup'});
    wrapper.find(btn).simulate('click');

    const wrapper = Enzyme.mount(
        <LoginModal 
            email = {test_account.email}
            password = {test_account.password}
            passwordConfirm = {test_account.passwordConfirm}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).toBe("Email must not be empty");
    
})

test("test_signup_email_invalid", async function(){

    const test_account = {
                        email: "morning",
                        password: "123456789",
                        passwordConfirm: "123456789"    
                        }
    const btn = screen.getByRole('button', {name: 'Signup'});
    wrapper.find(btn).simulate('click');

    const wrapper = Enzyme.mount(
        <LoginModal 
            email = {test_account.email}
            password = {test_account.password}
            passwordConfirm = {test_account.passwordConfirm}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).toBe("Email is invalid");
    
})

test("test_signup_email_existed", async function(){

    const test_account = {
                        email: "stest@gmail.com",
                        password: "123456789",
                        passwordConfirm: "123456789"    
                        }
    const btn = screen.getByRole('button', {name: 'Signup'});
    wrapper.find(btn).simulate('click');

    const wrapper = Enzyme.mount(
        <LoginModal 
            email = {test_account.email}
            password = {test_account.password}
            passwordConfirm = {test_account.passwordConfirm}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).toBe("Email already exists");
    
})

test("test_signup_password_empty", async function(){

    const test_account = {
                        email: "stest@gmail.com",
                        password: "",
                        passwordConfirm: "123456789"    
                        }
    const btn = screen.getByRole('button', {name: 'Signup'});
    wrapper.find(btn).simulate('click');

    const wrapper = Enzyme.mount(
        <LoginModal 
            email = {test_account.email}
            password = {test_account.password}
            passwordConfirm = {test_account.passwordConfirm}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).toBe("Password cannot be empty.");
    
})

test("test_signup_password_invalid", async function(){

    const test_account = {
                        email: "testtt@gmail.com",
                        password: "123456",
                        passwordConfirm: "123456"    
                        }
    const btn = screen.getByRole('button', {name: 'Signup'});
    wrapper.find(btn).simulate('click');

    const wrapper = Enzyme.mount(
        <LoginModal 
            email = {test_account.email}
            password = {test_account.password}
            passwordConfirm = {test_account.passwordConfirm}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).toBe("Password must be at least 8 characters");
    
})

test("test_signup_password_unmatched", async function(){

    const test_account = {
                        email: "testtt@gmail.com",
                        password: "123454566",
                        passwordConfirm: "12345sss6"    
                        }
    const btn = screen.getByRole('button', {name: 'Signup'});
    wrapper.find(btn).simulate('click');
    const wrapper = Enzyme.mount(
        <LoginModal 
            email = {test_account.email}
            password = {test_account.password}
            passwordConfirm = {test_account.passwordConfirm}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).toBe("Passwords must match.");
    
})

test("test_signup_success", async function(){

    const test_account = {
                        email: "testaswe@gmail.com",
                        password: "123456789",
                        passwordConfirm: "123456789"    
                        }
    const btn = screen.getByRole('button', {name: 'Signup'});
    wrapper.find(btn).simulate('click');
    const wrapper = Enzyme.mount(
        <LoginModal 
            email = {test_account.email}
            password = {test_account.password}
            passwordConfirm = {test_account.passwordConfirm}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).not.toBe(true);
    
})

test("test_login_success", async function(){

    const test_account = {
                        email: "testaswe@gmail.com",
                        password: "123456789",
                        }

    const btn = screen.getByRole('button', {name: 'Login'});
    wrapper.find(btn).simulate('click');

    const wrapper = Enzyme.mount(
        <LoginModal 
            email = {test_account.email}
            password = {test_account.password}
            passwordConfirm = {test_account.passwordConfirm}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).not.toBe(true);
    
})

test("test_login_not_registered", async function(){

    const test_account = {
                        email: "test1@gmail.com",
                        password: "123456789",
                        }

    const btn = screen.getByRole('button', {name: 'Login'});
    wrapper.find(btn).simulate('click');

    const wrapper = Enzyme.mount(
        <LoginModal 
            email = {test_account.email}
            password = {test_account.password}
            passwordConfirm = {test_account.passwordConfirm}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).toBe("Email or password incorrect");
    
})

test("test_login_not_verified", async function(){

    const test_account = {
                        email: "skytrain@gmail.com",
                        password: "123456789",
                        }

    const btn = screen.getByRole('button', {name: 'Login'});
    wrapper.find(btn).simulate('click');

    const wrapper = Enzyme.mount(
        <LoginModal 
            email = {test_account.email}
            password = {test_account.password}
            passwordConfirm = {test_account.passwordConfirm}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).toBe("Email not verified");
    
})

test("test_login_wrong_password", async function(){

    const test_account = {
                        email: "testaswe@gmail.com",
                        password: "1234dd6789",
                        }

    const btn = screen.getByRole('button', {name: 'Login'});
    wrapper.find(btn).simulate('click');

    const wrapper = Enzyme.mount(
        <LoginModal 
            email = {test_account.email}
            password = {test_account.password}
            passwordConfirm = {test_account.passwordConfirm}
        />);

    wrapper.find("form").simulate("submit");
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(wrapper.find(".error").exists()).toBe("Email or password incorrect");
    
})