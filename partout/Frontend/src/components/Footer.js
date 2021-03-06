import React, {Component} from 'react';
import '../styles/Footer.css';

export default class Footer extends Component {
    render() {
        return (
            <div className='footer'>
                <div className='footer-relative'>
                    <span className='color-accent'>System made using ReactJS and Spring by</span>
                    <strong className='color-accent font-italic'> R.N.</strong>
                </div>
            </div>
        );
    }
}
