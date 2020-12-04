import React from 'react';
import '../styles/Cart.css';

class CartComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
        }

        this.parseJson();
    }

    parseJson() {
        var cart = localStorage.getItem('cart');
        if (cart !== null) {
            var parsed = JSON.parse(cart);
            parsed.map(item => this.state.items.push(JSON.parse(item)));
        }
    }

    handlePurchase() {
        this.setState({
            items: localStorage.removeItem('cart')
        });
    }

    increase = (item) => {
        this.setState({
            change: item.quantity++
        });
    };

    decrease = (item) => {
        if (item.quantity > 0) {
            this.setState({
                change: item.quantity--
            });
        }
        else {
            this.setState({
                change: item.quantity = 0
            });
        }
    };

    customAmount = (item) => {
        this.setState({
            change: item.quantity
        });
    };

    showTable() {
        if (this.state.items.length > 0) {
            return (
                <>
                    <table className="table">
                        <thead className='table-head'>
                        <tr>
                            <td>Name</td>
                            <td>Price</td>
                            <td></td>
                            <td className='td-center'>Quantity</td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.items.map(
                                (item, index) =>
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td><b className='button table-add-button'
                                               onClick={() => this.increase(item)}> + </b></td>
                                        <td className='td-center'>{item.quantity}</td>
                                        <td><b className='button table-remove-button'
                                               onClick={() => this.decrease(item)}> - </b></td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className='purchase-btn-container'>
                        <button className='modal-btn text-field-height purchase-btn' onClick={this.handlePurchase}>
                            <b>Purchase</b></button>
                    </div>
                </>
            );
        }
        else {
            return (
                <h3 className="alert-warning text-center border-radius"> <b>Your shopping cart is empty</b> </h3>
            );
        }
    }

    render () {
        return (
            <div className='cart-container'>
                <div className='center-container'>
                    {this.showTable()}
                </div>
            </div>
        );

    }
}

export default CartComponent;