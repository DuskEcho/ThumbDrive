'use strict';
import React from 'react';

class LogButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Button onClick={this.props.action}>{this.props.text}</Button>);
    }
}

export default LogButton