'use strict';
import Interface from './user/Interface.jsx'
import React from 'react'
import ReactDOM from 'react-dom'

const e = React.createElement;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<div>
            <Interface type={"Med"}  onSubmit={()=>{console.log("Med submit action")}}/>
            <Interface type={"Jab"}  onSubmit={()=>{console.log("Jab submit action")}}/>
            <Interface type={"Reading"}  onSubmit={()=>{console.log("Reading submit action")}}/>
        </div>);
    }
}

const domContainer = document.getElementById('app');
ReactDOM.render(e(App), domContainer);