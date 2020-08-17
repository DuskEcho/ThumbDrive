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

        this.processSubmit = this
            .processSubmit
            .bind(this);
        this.determineInput = this
            .determineInput
            .bind(this);
        this.updateInputValue = this
            .updateInputValue
            .bind(this);
        this.updateDropdownValue = this
            .updateDropdownValue
            .bind(this);
        this.generateOptions = this
            .generateOptions
            .bind(this);
        this.state = {
            dropdownValue: this.props.dropdownOptionValues ? this.props.dropdownOptionValues[0] : null,
            inputValue: null
        }
    }

    updateInputValue(val){
        this.state.inputValue = val;
        console.log(val);
    }

    updateDropdownValue(val){
        this.state.dropdownValue = val;
        console.log(val);
    }

    processSubmit(){
       let body = JSON.stringify({
            type: this.state.dropdownValue,
            value: this.state.inputValue,
           date: moment().format("YYYY-MM-DD HH:mm:ss")
        })
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        };
        fetch(this.props.apiRoute, options)
            .then(response => console.log(response))
    }

    determineInput(){
        if (this.props.hasInput){
            let idValue = `${this.props.type}Input`
            return (<input id={idValue} className={"interface-input"} onChange={()=>{this.updateInputValue(document.getElementById(idValue).value)}} type={this.props.inputType}/>)
        }
        return
    }

    generateOptions(){
        let options = [];
        for (let i = 0; i < this.props.dropdownOptionValues.length; ++i) {
            options.push(<option value={this.props.dropdownOptionValues[i]}>{this.props.dropdownOptionTexts[i]}</option>)
        }
        return options;
    }

    render(){
        return (
            <div className={"interface"}>
                <LogButton action={this.processSubmit} text={this.props.type}/>
                <Dropdown type={this.props.type} change={this.updateDropdownValue} options={this.generateOptions()}/>
                {this.determineInput()}
            </div>
        );
    }
}

export default Interface