import React, { Component } from 'react';
import '../styles/Login.css';
import {Form, FormControl} from "react-bootstrap";
import axios from "axios";
import {CategoryData} from "./CategoryData";
import ItemService from "../services/ItemService";

export default class CreateItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {},
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({
            input
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if(this.validate()) {
            let input = {};
            input["name"] = "";
            input["price"] = "";
            input["quantity"] = "";
            input["description"] = "";
            input["category"] = "";
            this.setState({input: input});

            ItemService.addUserItem(this.state.input)
                .then(response => {
                    if (response.status === 201) {
                        alert("Your listing has been created");
                        this.props.needsReload(true);
                    }
                })
                .catch(error => {
                    alert("Something went wrong")
                });
        }
        else {

        }
    }

    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;
        const numberRegex = /^[0-9\b]+$/;

        if (!input["name"]) {
            isValid = false;
            errors["name"] = "Please enter your product name";
        }

        if (!input["price"]) {
            isValid = false;
            errors["price"] = "Please specify a price";
        }

        if (input["price"] <= 0) {
            isValid = false;
            errors["price"] = "Price should be more than 0!";
        }

        if (!numberRegex.test(input["price"])) {
            isValid = false;
            errors["price"] = "Price should be a number!";
        }

        if (!input["quantity"]) {
            isValid = false;
            errors["quantity"] = "Please specify how many products are you selling";
        }

        if (input["quantity"] <= 0) {
            isValid = false;
            errors["quantity"] = "You are already sold out?";
        }

        if (typeof input["category"] === 'undefined') {
            isValid = false;
            errors["category"] = "Please specify which category your product belongs to";
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    render () {
        return (
            <div className='div-login margin-top'>
                <Form className='form-login' onSubmit={this.handleSubmit}>
                    <label className="text align-start"><b>Product name*</b></label>
                    <FormControl
                        type="text"
                        name="name"
                        value={this.state.input.name}
                        onChange={this.handleChange}
                        placeholder="What product are you selling?"
                        className='text-field-login align-center'
                        id="name"/>
                    <div className="text-danger align-warning">{this.state.errors.name}</div>

                    <label className="text align-start"><b>Price*</b></label>
                    <FormControl
                        type="text"
                        name="price"
                        value={this.state.input.price}
                        onChange={this.handleChange}
                        placeholder="What is your product price?"
                        className='text-field-login align-center'
                        id="price"/>
                    <div className="text-danger align-warning">{this.state.errors.price}</div>

                    <label className="text align-start"><b>Quantity*</b></label>
                    <FormControl
                        type="number"
                        name="quantity"
                        value={this.state.input.quantity}
                        onChange={this.handleChange}
                        placeholder="How many are you selling?"
                        className='text-field-login align-center'
                        id="quantity"/>
                    <div className="text-danger align-warning">{this.state.errors.quantity}</div>

                    <label className="text align-start"><b>Description</b></label>
                    <FormControl
                        type="text"
                        name="description"
                        value={this.state.input.description}
                        onChange={this.handleChange}
                        placeholder="Add a short description"
                        className='text-field-login align-center'
                        id="description"/>
                    <div className="text-danger align-warning">{this.state.errors.description}</div>

                    <label className="text align-start"><b>Category*</b></label>
                    <FormControl
                        as="select"
                        name="category"
                        value={this.state.input.category}
                        onChange={this.handleChange}
                        placeholder="Which category fits your product best?"
                        className='text-field-login align-center'
                        id="category">
                        <option />
                        {CategoryData.map((item) => {
                            return (
                                <option>{item.title}</option>
                            );
                        })}
                    </FormControl>
                    <label className="text-danger align-warning">{this.state.errors.category}</label>

                    <button className='button-login align-center'>
                        <b>Create</b>
                    </button>
                </Form>
            </div>
        );
    }
}