'use strict';
import LogButton from "./LogButton.jsx";
import Dropdown from "./Dropdown.jsx";
import React from 'react'

class Interface extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"interface"}>
                <LogButton action={this.props.onSubmit} text={this.props.type}/>
                <Dropdown options={this.props.dropdownOptions}/>
                <input type={this.props.inputType}/>
            </div>
        );
    }
}

export default Interface