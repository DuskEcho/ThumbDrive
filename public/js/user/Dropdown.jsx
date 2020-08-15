'use strict';
import React from 'react';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
    }

    generateOptions(){
        return options;
    }



    render() {
        return (<select className={"type-select form-control"} onChange={this.props.onChange}>{this.props.options}</select>);
    }
}

export default Dropdown