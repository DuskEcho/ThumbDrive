'use strict';
import Interface from './user/Interface'
import React from 'react'
import Report from "./user/Report";

const e = React.createElement;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<div>
            <Interface onSubmit={} type={"Med"} dropdownRoute={} dropdownData={}/>
            <Interface onSubmit={} type={"Jab"} dropdownRoute={} dropdownData={}/>
            <Interface onSubmit={} type={"Reading"} dropdownRoute={} dropdownData={}/>
            <Report dataRoute={} dataData={}/>
            <Report dataRoute={} dataData={}/>
            <Report dataRoute={} dataData={}/>
        </div>);
    }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(e(App), domContainer);