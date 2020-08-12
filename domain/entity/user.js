'use strict';
module.exports = class User{

    constructor(id, email, userType){
        //upon finishing population of object, send to database.
        //any validity checks will have to occur prior to this.
        this.id = id;
        this.email = email;
        this.user_type = userType;
    }
};