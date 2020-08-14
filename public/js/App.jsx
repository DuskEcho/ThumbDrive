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
            <Interface type={"Med"} /* onSubmit={} dropdownRoute={} dropdownData={}*//>
            <Interface type={"Jab"} /* onSubmit={} dropdownRoute={} dropdownData={}*//>
            <Interface type={"Reading"} /* onSubmit={} dropdownRoute={} dropdownData={}*//>
        </div>);
    }
}

const domContainer = document.getElementById('app');
ReactDOM.render(e(App), domContainer);