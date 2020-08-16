'use strict';
import React from 'react';

/**
 * Expects the following props:
 * action: onClick action to be taken (function)
 * text: Button text
 */
class LogButton extends React.Component {
    constructor(props) {
        super(props);
        this.test = this.test.bind(this);
    }

    test(){
        console.log(`${this.props.text} clicked`)
    }
    render() {
        return (<button className={"btn btn-success btn-circle"} onClick={this.props.action}>{this.props.text}</button>);
    }
}

export default LogButton