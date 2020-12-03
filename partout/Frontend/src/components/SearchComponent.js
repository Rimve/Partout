import React from "react";
import '../styles/Products.css';
import {Form, FormControl} from "react-bootstrap";
import {Link} from "react-router-dom";

class SearchComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: ''
        };
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    render () {
        return (
            <>
                <div className='search-bar'>
                    <Form className='form-center'>
                        <FormControl type="text" value={this.state.inputValue} placeholder="Search" className='text-field-height' onChange={evt => this.updateInputValue(evt)} />
                        <span>
                            <Link to={{pathname: '/items', state: {name: this.state.inputValue}}} className='no-deco'>
                                <button type='button' className='button-search text-field-height'>
                                    <b>Search</b>
                                </button>
                            </Link>
                        </span>
                    </Form>
                </div>
            </>
        );
    }
}

export default SearchComponent;