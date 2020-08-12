'use strict';
module.exports = class Med{

    constructor(id, date, med_type, med_dose){
        //upon finishing population of object, send to database.
        //any validity checks will have to occur prior to this.
        this.id = id;
        this.date = date;
        this.med_type = med_type;
        this.med_dose = med_dose;
    }
};