'use strict';
import React from 'react';

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.getThead = this
            .getTHead
            .bind(this);
        this.getTBody = this
            .getTBody
            .bind(this);
    }

    getTHead(){
        return <tr>{this.props.thList}</tr>
    }
    getTBody(){
        return <tr>{this.props.trList}</tr>
    }

    render() {
        this.state.needsChange = false;
        return (<table>{this.getTHead()}{this.getTBody()}</table>);
    }
}

export default Report