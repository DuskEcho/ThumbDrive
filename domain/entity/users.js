'use strict';
module.exports = class Jabs{

    constructor(id, email){
        //upon finishing population of object, send to database.
        //any validity checks will have to occur prior to this.
        this.id = id;
        this.email = email;
    }
};