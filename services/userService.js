const util = require('util');
const request = util.promisify(require('request'));
const userRepo = require('../repositories/userRepo.js');


class UserService {
    constructor() {
    };


    /**
     * Instantiates and returns a user object.
     *
     * @returns {Promise<>}
     * @param email
     * @param userType
     */
    async createUser(email, userType) {
        if (!email || !userType) {
            let error = {status: "failed to create user\n", reason: ""};
            error.reason += email ? "" : "email was invalid\n";
            error.reason += userType ? "" : "userType was invalid\n";

            console.log(error.status + error.reason);
            return error;
        }
        let id = await userRepo.createUser(email, userType).catch(err => console.log(err));
        return userRepo.getUser(id);
    }


    /**
     * deletes a user object.
     *
     * @returns {Promise<>}
     * @param id
     */
    async deleteUser(id) {
        if (!id) {
            let error = {status: "failed to delete user\n", reason: "Id was invalid"};
            console.log(error.status + error.reason);
            return error;
        }
        userRepo.deleteUser(id).catch(err => console.log(err));
    }


    /**
     * Updates the user specified by id with new values
     *
     * @param id    - email settings' database id
     * @param lastEmailed
     * @param emailFrequency
     */
    async updateUser(id, lastEmailed, emailFrequency) {
        await userRepo.updateUser(id, lastEmailed, emailFrequency).catch(err => console.log(err));
        return await this.getUser(id).catch(err => console.log(err));
    }


    /**
     * Retrieves all user
     *
     * @returns {Promise<[]>}
     */
    async getAllUsers() {
        return await userRepo.getAllUsers().catch(error => console.log(error));
    }


    /**
     * Retrieves a user
     *
     * @returns {Promise<void>}
     */
    async getUser(id) {
        console.log(`Getting email settings ${id}...`);
        return await userRepo.getUser(id).catch(error => console.log(error));
    }
}

module.exports = new UserService();