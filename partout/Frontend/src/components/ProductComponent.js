import { CategoryData } from "./CategoryData";
import ItemComponent from "./ItemsComponent";
import React from "react";
import '../styles/Products.css';

class ProductComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: "empty"
        };
    }

    filter(category) {
        this.setState({filter: category})
    }

    render () {
        return (
            <>
                <div className='products'>
                    <div className='categories'>
                        <ul className='category-items'>
                            <li className='category-title-li'>
                                <b className='category-title'>Categories</b>
                            </li>
                            {CategoryData.map((item, index) => {
                                return (
                                    <li key={index} className='nav-text'>
                                        <button className='category-li' onClick={() => this.filter(item.filter)}>
                                            {item.title}
                                            <b className='icon-margin'>{item.icon}</b>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <ItemComponent handleFilter={this.state.filter}/>
                </div>
            </>
        );
    }
}

export default ProductComponent;