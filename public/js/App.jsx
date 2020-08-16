'use strict';
import Interface from './user/Interface.jsx'
import React from 'react'
import ReactDOM from 'react-dom'

const e = React.createElement;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reportNeedsUpdate: false;
        };
        this.updateReport = this
            .updateReport
            .bind(this);
    }

    updateReport(){
        this.state.reportNeedsUpdate = true;
    }

    render() {
        return (<div>
            <Interface type={"Jab"} dropdownOptions={(()=>{return ([<option value={"insulin16"}>Insulin 16 Units</option>, <option value={"insulin8"}>Insulin 8 Units</option>])})()}
                       hasInput={false} onSubmit={()=>{console.log("Jab submit action")}}/>
            <Interface type={"Reading"} hasInput={true} inputType={"number"} dropdownOptions={(()=>{return <option value={"bloodGlucose"}>Blood Glucose</option>})()} onSubmit={()=>{console.log("Reading submit action")}}/>
        </div>);
    }
}

const domContainer = document.getElementById('app');
ReactDOM.render(e(App), domContainer);