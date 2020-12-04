import React, {Component} from 'react';
import CartComponent from "../components/CartComponent";

export default class ShoppingCart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <CartComponent />
            </>
        );
    }
}