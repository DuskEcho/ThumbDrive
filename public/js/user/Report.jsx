'use strict';
import React from 'react';
import moment from 'moment';

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thead: null,
            tbody: null
        };
        this.setTHead = this
            .setTHead
            .bind(this);
        this.setTBody = this
            .setTBody
            .bind(this);
    }

    setTHead() {
        let thList = [];
        for (let title of this.props.titles) {
            thList.push(<th>{title}</th>)
        }

        this.state.thead = <tr>{thList}</tr>
    }

    setTBody() {
        let rowsList = [];
        console.log("ROWS")
        console.log(this.props.rows)
        for (let row of this.props.rows) {
            let tds = [];
            tds.push(<td>{row[this.props.relevant]}</td>);
            tds.push(<td>{moment(row.date).format("MM-DD-YY HH:mm:ss")}</td>);
            rowsList.push(<tr>{tds}</tr>)
        }
        console.log("FINAL ROWS")
        console.log(rowsList)
        this.state.tbody = rowsList;
    }

    render() {
        this.setTHead();
        this.setTBody();
        return (
            <div key={JSON.stringify(this.props.rows)}>
                <div className={"report-label"}><label>{this.props.name}</label></div>
                <div className={"report-table"}>
                    <table className={"table"}>{this.state.thead}{this.state.tbody}</table>
                </div>
            </div>);
    }
}

export default Report