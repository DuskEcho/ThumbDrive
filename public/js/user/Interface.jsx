'use strict';
import LogButton from "./LogButton.jsx";
import Dropdown from "./Dropdown.jsx";
import React from 'react';
import moment from 'moment';

/**
 * Expects properties:
 * logChange: function (no arguments) to to notify parent of change
 * hasInput: boolean value to indicate whether an html input should be present
 * inputType: string indicating what type of html input (number, text, etc)
 * dropdownOptions: list of <options></options> to populate dropdown for interface
 */
class Interface extends React.Component {
    constructor(props) {
        super(props);

        this.processSumit = this
            .processSubmit
            .bind(this);
        this.determineInput = this
            .determineInput
            .bind(this);
    }

    processSubmit(stringifiedBody){
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: stringifiedBody
        };
        fetch(this.props.apiRoute, options)
            .then(response => response.json())
            .then(data => setPostId(data.id))
            .then(()=>this.props.logChange());
    }

    determineInput(){
        if (this.props.hasInput){
            return (<input type={this.props.inputType}/>)
        }
        return
    }

    render() {
        return (
            <div className={"interface"}>
                <LogButton action={this.processSubmit} text={this.props.type}/>
                <Dropdown options={this.props.dropdownOptions}/>
                {this.determineInput()}
            </div>
        );
    }
}

export default Interface