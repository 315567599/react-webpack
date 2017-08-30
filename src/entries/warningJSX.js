/**
 * Created by Administrator on 2017/8/30.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

function WarningBanner(props) {
    if (!props.warn) {
       return null;
    }

    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number, index) =>
        <li key={index}>{number}</li>
    );
    return (
       <div className="warning">
          Warning!
           <ul>
               {listItems}
           </ul>
       </div>
    );
}

class Page extends React.Component {
    constructor(props) {
       super(props);
       this.state = {showWarning: true};
       this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
        this.setState(prevState => ({
            showWarning:!prevState.showWarning
            })
        );
    }

    render() {
        return (
            <div>
                <WarningBanner warn = {this.state.showWarning}/>
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        );
    }
}

ReactDOM.render(<Page/>, document.getElementById('root'));
