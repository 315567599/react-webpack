/**
 * Created by Administrator on 2017/8/31.
 */
import React,{Component} from 'react';

class CustomTextInput extends React.Component {
    constructor(props) {
       super(props);
       this.focus = this.focus.bind(this);
    }

    focus() {
        this.textInput.focus();
    }

    render() {
       return (
          <div>
              <input
                  type="text"
                  ref={(input) => {this.textInput = input;}}
              />
              <input
                  type="button"
                  value='focus the text input'
                  onClick={this.focus}
              />
          </div>
       );
    }
}

export default CustomTextInput;
