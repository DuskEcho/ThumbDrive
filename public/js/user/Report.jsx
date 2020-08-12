'use strict';
import React from 'react';

class Report extends React.Component {
    constructor(props) {
        super(props);
    }

    getTHead(){

    }
    getTBody(){

    }

    render() {
        this.state.needsChange = false;
        return (<table>{this.getTHead()}{this.getTBody()}</table>);
    }
}

export default Report