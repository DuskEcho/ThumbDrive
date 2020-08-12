'use strict';
module.exports = class Session {

    constructor(id, email, startDate, exp){
        //upon finishing population of object, send to database.
        //any validity checks will have to occur prior to this.
        this.id = id;
        this.email = email;
        this.startDate = startDate;
        this.exp = exp;
    }
};