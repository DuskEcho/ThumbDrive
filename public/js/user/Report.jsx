'use strict';
import React from 'react';

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getThead = this
            .getTHead
            .bind(this);
        this.getTBody = this
            .getTBody
            .bind(this);
    }

    getTHead(){
        let thList = [];
        for (let title of this.props.titles){
            thList.push(<th>{title}</th>)
        }

        return <tr>{thList}</tr>
    }
    getTBody(){
        let rowsList = [];
        for (let row of this.props.rows){
            let tds = [];
            for (let key in row){
                tds.push(<td>{row[key]}</td>);
            }
            rowsList.push(<tr>{tds}</tr>)
        }
        return rowsList;
    }

    render() {
        this.state.needsChange = false;
        return (<div className={"report-table"}><table className={"table"}>{this.getTHead()}{this.getTBody()}</table></div>);
    }
}

export default Report