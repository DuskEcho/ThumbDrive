'use strict';
import React from 'react';

class LogButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<button className={"btn btn-success btn-circle"} onClick={this.props.action}>{this.props.text}</button>);
    }
}

export default LogButton