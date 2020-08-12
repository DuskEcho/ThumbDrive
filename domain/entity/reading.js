'use strict';
module.exports = class Reading{

    constructor(id, date, readingType, numbers){
        //upon finishing population of object, send to database.
        //any validity checks will have to occur prior to this.
        this.id = id;
        this.date = date;
        this.readingType = readingType;
        this.numbers = numbers;
    }
};