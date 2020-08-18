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
            jabReportData: [],
            readingReportData: [],
            readingsLoading: false,
            jabsLoading: false

        };
        this.updateJabs = this
            .updateJabs
            .bind(this);
        this.updateReadings = this
            .updateReadings
            .bind(this);
        this.updateJabs();
        this.updateReadings();
    }


    updateJabs() {
        this.state.jabsLoading = true;
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(`https://www.thumbdrive.app/api/getMyJabs`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    jabReportData: data,
                    jabsLoading: false
                })
                console.log(this.state);
            });
    }

    updateReadings() {
        this.state.readingsLoading = true;
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        };
        fetch(`https://www.thumbdrive.app/api/getMyReadings`, options)
            .then(response => response.json())
            .then(data => {
                for (var item of data){
                    item.jabCombo = `${item.jabType} ${item.jabDose}`
                }
                console.log(data);
                this.setState({
                    readingReportData: data,
                    readingsLoading: false
                })
                console.log(this.state);
            });
    }

    render() {

        if (this.state.reportNeedsUpdate) {
            this.updateJabs();
            this.updateReadings();
        }

        return (<div>
            <Interface type={"Jab"} apiRoute={`https://www.thumbdrive.app/api/createJab`}
                       dropdownOptionValues={["insulin16", "insulin8"]}
                       dropdownOptionTexts={["Insulin 16 Units", "Insulin 8 Units"]}
                       hasInput={true} inputType={"text"} submitComplete={this.updateJabs}/>
            <Interface type={"Reading"} apiRoute={`https://www.thumbdrive.app/api/createReading`} hasInput={true}
                       inputType={"number"} dropdownOptionValues={["bloodGlucose"]}
                       dropdownOptionTexts={["Blood Glucose"]}
                       submitComplete={this.updateReadings}/>


            <Report name={"Insulin Jabs"} titles={["Type", "Time"]}
                    rows={this.state.jabReportData}
                    relevant={"jabCombo"}></Report>
            <Report name={"Blood Glucose Readings"} titles={["Reading", "Time"]}
                    rows={this.state.readingReportData}
                    relevant={"numbers"}></Report>
        </div>);
    }
}

const domContainer = document.getElementById('app');
ReactDOM.render(e(App), domContainer);