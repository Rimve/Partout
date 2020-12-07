import React from 'react';
import ItemService from '../services/ItemService';
import ModalToCartComponent from "./ModalToCartComponent";
import ModalToRemoveComponent from "./ModalToRemoveComponent";
import {getUserId} from "../services/TokenValidator";
import UserService from "../services/UserService";
import CreateItemComponent from "./CreateItemComponent";

class ItemsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            showComponent: false,
            body: '',
            shopItem: '',
            itemId: -1,
            reload: false
        };
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    modalCallback = (data) => {
        this.setState({showComponent: data})
        this.getItems();
    };

    createItemCallback = (data) => {
        this.setState( {reload: data})
        this.getItems();
    };

    onButtonClick(item) {
        this.setState({
            body: item.name,
            shopItem: item,
            itemId: item.id_Item
        });
        if (!this.state.showComponent) {
            this.setState({
                showComponent: true,
            });
        }
    }

    getItems() {
        if (this.props.getMyItems) {
            UserService.getItemsByUserId(getUserId(localStorage.getItem('token')))
                .then((response) => {
                    this.setState({items: response.data})
                })
                .catch(err => {
                    if (err.response.status === 403) {
                        this.setState({errorMessage: "You do not have the required rights"});
                    } else {
                        this.setState({errorMessage: err.message});
                    }
                });
        }
        if (this.props.handleSearch === '' && !this.props.getMyItems) {
            ItemService.getItemsByCat(this.props.handleFilter)
                .then((response) => {
                    this.setState({items: response.data})
                })
                .catch(err => {
                    if (err.response.status === 403) {
                        this.setState({errorMessage: "You do not have the required rights"});
                    } else {
                        this.setState({errorMessage: err.message});
                    }
                });
        }
        if (this.props.handleSearch !== '' && !this.props.getMyItems) {
            ItemService.getItemsByName(this.props.handleSearch)
                .then((response) => {
                    this.setState({items: response.data})
                })
                .catch(err => {
                    if (err.response.status === 403) {
                        this.setState({errorMessage: "You do not have the required rights"});
                    } else {
                        this.setState({errorMessage: err.message});
                    }
                });
        }
    }

    componentDidMount() {
        this.getItems();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.handleFilter !== this.props.handleFilter) {
            this.getItems();
        }
        if (prevProps.handleSearch !== this.props.handleSearch) {
            this.getItems();
        }
    }

    showProfileItems() {
        if (this.props.getMyItems) {
            return (
                <CreateItemComponent needsReload={this.createItemCallback}/>
            );
        }
    }

    showModal() {
        if (!this.props.getMyItems) {
            return (
                this.state.showComponent ?
                    <ModalToCartComponent
                        show={this.state.showComponent}
                        body={this.state.body}
                        callBack={this.modalCallback}
                        itemToAdd={this.state.shopItem}
                    /> : null
            );
        }
        if (this.props.getMyItems) {
            return (
                this.state.showComponent ?
                    <ModalToRemoveComponent
                        show={this.state.showComponent}
                        body={this.state.body}
                        callBack={this.modalCallback}
                        itemId={this.state.itemId}
                    /> : null
            );
        }
    }

    render () {
        if (!this.state.errorMessage) {
            return (
                <div className='item-container-grid'>
                    {this.showModal()}
                        {this.state.items.map((item, index) => {
                            return (
                                <>
                                    <div key={index} className='item-container' onClick={ () => this.onButtonClick(item)}>
                                        <div className='item-text'>
                                            <strong>Product: </strong>{item.name}
                                        </div>
                                        <div className='item-text'>
                                            <strong>Price: </strong>{item.price}
                                        </div>
                                        <div className='item-text'>
                                            <strong>Quantity: </strong>{item.quantity}
                                        </div>
                                        <div className='item-description'>
                                            <strong>Description: </strong>{item.description}
                                        </div>
                                        <div className='item-text'>
                                            <strong>Category: </strong>{item.category}
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    {this.showProfileItems()}
                </div>
            );
        }
        if (this.state.errorMessage) {
            return (
                <div className='center'>
                    <h3 className='alert-danger text-center border-radius'>
                        { this.state.errorMessage }
                    </h3>
                </div>
            );
        }
    }
}

export default ItemsComponent;