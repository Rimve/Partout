import React from 'react';
import ItemService from '../services/ItemService';

class ItemsComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            items:[]
        }
    }

    componentDidMount(){
        ItemService.getItems()
            .then((response) => {
                this.setState({ items: response.data})
            })
            .catch(err => {
                if (err.response.status === 403) {
                    this.setState({errorMessage: "You do not have the required rights"});
                }
                else {
                    this.setState({errorMessage: err.message});
                }
                console.log(err);
            });
    }

    render () {
        if (!this.state.errorMessage) {
            return (
                <div>
                    <h1 className='text-center color-accent'>Items List</h1>
                    <table className="table table-secondary">
                        <thead>
                        <tr>
                            <td>Item ID</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Description</td>
                            <td>Category</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.items.map(
                                item =>
                                    <tr key={item.id_Item}>
                                        <td>{item.id_Item}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.description}</td>
                                        <td>{item.category}</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            );
        }
        if (this.state.errorMessage) {
            return (<h3 className="alert-danger text-center"> { this.state.errorMessage } </h3>);
        }
    }
}

export default ItemsComponent;