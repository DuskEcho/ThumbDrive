'use strict';
import LogButton from "./LogButton";
import Dropdown from "./Dropdown";
import React from 'react'

class Interface extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <LogButton action={this.props.onSubmit} text={this.props.type}/>
                <Dropdown ajaxRoute={this.props.dropdownRoute} ajaxData={this.props.dropdownData}/>
            </div>
        );
    }
}

export default Interface