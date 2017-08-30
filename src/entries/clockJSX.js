/**
 * Created by Administrator on 2017/8/29.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    /*
     *  fetchComments().then(response => {
     this.setState({
     comments: response.comments
     });
     });
     }
    *
    *
     */

    tick() {
       this.setState({
           date: new Date()
       });
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            100
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div>
                <h1>Hello, world !</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

ReactDOM.render(<Clock/>, document.getElementById('root'));
