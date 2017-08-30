/**
 * Created by Administrator on 2017/8/30.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

function UserGreeting(props) {
   return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
   return <h1>Please sign in .</h1>
}

function Geeeting(props) {
   const isLoggedIn = props.isLoggedIn;
   if (isLoggedIn) {
      return <UserGreeting/>
   }
   return <GuestGreeting/>
}

class Toggle extends React.Component {
    constructor(props) {
       super(props);
       this.state = {isToggleOn: true};
       this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState((prevState) =>({
           isToggleOn:!prevState.isToggleOn
        }));
    }

    handleClick2 = (e) => {
        console.log(e);
        this.setState((prevState) =>({
            isToggleOn:!prevState.isToggleOn
        }));
    }

    render() {
        return (
            <div>
                <Geeeting isLoggedIn = {true} />
                <button onClick={this.handleClick2}>
                    {this.state.isToggleOn ? 'ON' : 'OFF'}
                </button>
            </div>
        );
    }

}

ReactDOM.render(<Toggle/>, document.getElementById('root'));
