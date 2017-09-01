/**
 * Created by Administrator on 2017/8/31.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Greeting extends React.Component {
    render() {
        return (
            <h1>Hello, {this.props.name}</h1>
        );
    }
}

Greeting.defaultProps = {
    name:'Stranger'
};

Greeting.propTypes = {
    name:PropTypes.string
};
