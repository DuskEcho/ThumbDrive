'use strict';
import Interface from './user/Interface.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
import Report from './user/Report.jsx'

const e = React.createElement;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reportNeedsUpdate: false,
            reportData: {}
        };
        this.updateReport = this
            .updateReport
            .bind(this);
    }



    updateReport(){

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`http://www.thumbdrive.app/api/getJabsByUser`, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    render() {


        return (<div>
            <Interface type={"Jab"} apiRoute={`http://localhost:8080/api/createJab`} dropdownOptionValues={["insulin16", "insulin8"]} dropdownOptionTexts={["Insulin 16 Units", "Insulin 8 Units"]}
                       hasInput={false} onSubmit={this.updateReport}/>
            <Interface type={"Reading"} apiRoute={`http://localhost:8080/api/createReading`} hasInput={true} inputType={"number"}  dropdownOptionValues={["bloodGlucose"]} dropdownOptionTexts={["Blood Glucose"]}/>

            <label className={"report-label"}>Insulin Jabs:</label>
            <Report titles={["1", "a", "2"]} rows={[
                {obj1key1:"value1", obj1key2:"value2", obj1key3:"value3"},
                {obj2key1:"value1", obj2key2:"value2", obj2key3:"value3"},
                {obj1key1:"value1", obj1key2:"value2", obj1key3:"value3"},
                {obj2key1:"value1", obj2key2:"value2", obj2key3:"value3"},
                {obj1key1:"value1", obj1key2:"value2", obj1key3:"value3"},
                {obj2key1:"value1", obj2key2:"value2", obj2key3:"value3"},
                {obj1key1:"value1", obj1key2:"value2", obj1key3:"value3"},
                {obj2key1:"value1", obj2key2:"value2", obj2key3:"value3"},
                {obj1key1:"value1", obj1key2:"value2", obj1key3:"value3"},
                {obj2key1:"value1", obj2key2:"value2", obj2key3:"value3"},
                {obj1key1:"value1", obj1key2:"value2", obj1key3:"value3"},
                {obj2key1:"value1", obj2key2:"value2", obj2key3:"value3"},
                {obj1key1:"value1", obj1key2:"value2", obj1key3:"value3"},
                {obj2key1:"value1", obj2key2:"value2", obj2key3:"value3"},
                {obj3key1:"value1", obj3key2:"value2", obj3key3:"value3"}
            ]}></Report>
            <label className={"report-label"}>Blood Glucose:</label>
            <Report titles={["1", "a", "2"]} rows={[
                {obj1key1:"value1", obj1key2:"value2", obj1key3:"value3"},
                {obj2key1:"value1", obj2key2:"value2", obj2key3:"value3"},
                {obj1key1:"value1", obj1key2:"value2", obj1key3:"value3"},
                {obj2key1:"value1", obj2key2:"value2", obj2key3:"value3"},
                {obj1key1:"value1", obj1key2:"value2", obj1key3:"value3"},
                {obj2key1:"value1", obj2key2:"value2", obj2key3:"value3"},
                {obj1key1:"value1", obj1key2:"value2", obj1key3:"value3"},
                {obj2key1:"value1", obj2key2:"value2", obj2key3:"value3"},
                {obj1key1:"value1", obj1key2:"value2", obj1key3:"value3"},
                {obj2key1:"value1", obj2key2:"value2", obj2key3:"value3"},
                {obj1key1:"value1", obj1key2:"value2", obj1key3:"value3"},
                {obj2key1:"value1", obj2key2:"value2", obj2key3:"value3"},
                {obj1key1:"value1", obj1key2:"value2", obj1key3:"value3"},
                {obj2key1:"value1", obj2key2:"value2", obj2key3:"value3"},
            {obj3key1:"value1", obj3key2:"value2", obj3key3:"value3"}
        ]}></Report>
        </div>);
    }
}

const domContainer = document.getElementById('app');
ReactDOM.render(e(App), domContainer);