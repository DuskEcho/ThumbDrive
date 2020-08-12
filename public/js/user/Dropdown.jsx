'use strict';
import React from 'react';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
    }

    generateOptions(){
        //run ajax with state ajax data to get dropdown data
    }

    onChange(){
        //???
    }

    render() {
        return (<select onChange={this.onChange()}>{this.generateOptions()}</select>);
    }
}

export default Dropdown