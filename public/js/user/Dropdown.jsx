'use strict';
import React from 'react';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
    }

    generateOptions(){
        fetch()
        let options = [];
        for (let option of this.props.options){
            options.push(<option value={option.value}>{option.text}</option>)
        }
        return options;
    }


    onChange(){
        //???
    }

    render() {
        return (<select className={"type-select form-control"} onChange={this.onChange()}>{this.generateOptions()}</select>);
    }
}

export default Dropdown