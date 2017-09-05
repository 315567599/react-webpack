/**
 * Created by Administrator on 2017/9/4.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';

class MyEditor extends React.Component {
    constructor(props) {
       super(props);
       this.state = {editorState:EditorState.createEmpty()};
       this.onChange = (editorState) => this.setState({editorState});
       this.handleKeyCommand = this.handleKeyCommand.bind(this);
       this.onBoldClick = this.onBoldClick.bind(this);
    }

    handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
           this.onChange(newState);
           return 'handled';
        }
        return 'not-handled';
    }

    onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }
    render() {
        return (
            <div>
                <button onClick={this.onBoldClick}>Bold</button>
                <Editor
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

ReactDOM.render(<MyEditor/>, document.getElementById('root'));