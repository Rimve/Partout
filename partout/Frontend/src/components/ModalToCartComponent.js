import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import '../styles/Modal.css';

class ModalToCartComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartItem: '',
            show: this.props.show
        };
    }

    handleClose = () => {
        this.setState({
            show: false,
        });
        this.props.callBack(false);
    };

    handleAdd(item) {
        var cartItems = [];
        var storedCartItems = localStorage.getItem('cart');
        var tempItem = JSON.stringify(item);
        tempItem = JSON.parse(tempItem);
        tempItem.quantity = 1;

        if (storedCartItems !== null) {
            cartItems = JSON.parse(storedCartItems);
            cartItems.push(JSON.stringify(tempItem));
        }
        else {
            cartItems[0] = JSON.stringify(tempItem);
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));
        this.handleClose();
    };

    render() {
        return (
            <>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add to cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you want to add '<b>{this.props.body}</b>' to your shopping cart?</Modal.Body>
                    <Modal.Footer>
                        <button className='modal-btn cancel-btn' onClick={this.handleClose}>
                            <b>Cancel</b>
                        </button>
                        <button className='modal-btn' onClick={() => this.handleAdd(this.props.itemToAdd)}>
                            <b>Add</b>
                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default ModalToCartComponent;