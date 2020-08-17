'use strict';
import React from 'react';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let totalSelect = <select
            ref={`${this.props.type}Dropdown`}
            onLoad={() => {
                this.props.change(this.refs[`${this.props.type}Dropdown`].value)
            }}
            onChange={(e) => {
                this.props.change(e.target.value)
            }}
            className={"type-select form-control"}>
            {this.props.options}
        </select>;

        return totalSelect;
    }
}

export default Dropdown