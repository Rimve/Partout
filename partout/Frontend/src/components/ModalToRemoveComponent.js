import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import '../styles/Modal.css';
import ItemService from "../services/ItemService";

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

    handleRemove(itemId) {
        this.handleClose();
        ItemService.deleteUserItem(itemId)
            .then(response => {
                if (response.status === 204) {
                    alert("Your listing has been deleted");
                }
            })
            .catch(error => {
                alert("Something went wrong");
            });
    };

    render() {
        return (
            <>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Remove listing</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you want to delete '<b>{this.props.body}</b>' listing?</Modal.Body>
                    <Modal.Footer>
                        <button className='modal-btn' onClick={this.handleClose}>
                            <b>Cancel</b>
                        </button>
                        <button className='modal-btn cancel-btn' onClick={() => this.handleRemove(this.props.itemId)}>
                            <b>Remove</b>
                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default ModalToCartComponent;