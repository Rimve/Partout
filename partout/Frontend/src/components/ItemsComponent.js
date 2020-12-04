import React from 'react';
import ItemService from '../services/ItemService';
import ModalToCartComponent from "./ModalToCartComponent";

class ItemsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            showComponent: false,
            body: '',
            shopItem: ''
        };
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    modalCallback = (data) => {
        this.setState({showComponent: data})
    };

    onButtonClick(item) {
        this.setState({
            body: item.name,
            shopItem: item,
        });
        if (!this.state.showComponent) {
            this.setState({
                showComponent: true,
            });
        }
    }

    getItems() {
        if (this.props.handleSearch === '') {
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
                    console.log(err);
                });
        }
        else {
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
                    console.log(err);
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

    render () {
        if (!this.state.errorMessage) {
            return (
                <div className='item-container-grid'>
                    {this.state.showComponent ?
                        <ModalToCartComponent
                            show={this.state.showComponent}
                            body={this.state.body}
                            callBack={this.modalCallback}
                            itemToAdd={this.state.shopItem}
                        /> : null}
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
                                            Very great description, condition is okey, not great, not terrible, I recommend. Rate me 8 out of 8 pls.
                                        </div>
                                        <div className='item-text'>
                                            <strong>Category: </strong>{item.category}
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                        }
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