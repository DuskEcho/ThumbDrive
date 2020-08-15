'use strict';
import React from 'react';

class LogButton extends React.Component {
    constructor(props) {
        super(props);
        this.test = this.test.bind(this);
    }

    test(){
        console.log(`${this.props.text} clicked`)
    }
    render() {
        return (<button className={"btn btn-success btn-circle"} onClick={this.test}>{this.props.text}</button>);
    }
}

export default LogButton