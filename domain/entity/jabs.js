'use strict';
module.exports = class Jabs{

    constructor(id, date, type){
        //upon finishing population of object, send to database.
        //any validity checks will have to occur prior to this.
        this.id = id;
        this.date = date;
        this.type = type;
    }
};