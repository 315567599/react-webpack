import React from 'react';
import ReactDOM from 'react-dom';

function Welcome(props) {
    return <h1>Hello, {props.name}</h1>
}

function tick() {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}</h2>
            <Welcome name ="sara" />
        </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
}


setInterval(tick(), 100);