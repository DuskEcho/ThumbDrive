const util = require('util');
const request = util.promisify(require('request'));
const jabRepo = require('../repositories/jabRepo.js');
const myUtil = require('../util.js');


class JabService {
    constructor() {
    };

    /**
     * Instantiates and returns a jab object.
     *
     * @returns {Promise<>}
     * @param date
     * @param jabType
     * @param jabDose
     * @param userId
     */
    async createJab(date, jabType, jabDose, userId) {
        if (!date || !jabType) {
            let error = {status: "failed to create jab\n", reason: ""};
            error.reason += date ? "" : "date was invalid\n";
            error.reason += jabType ? "" : "jabType was invalid\n";

            console.log(error.status + error.reason);
            return error;
        }

        myUtil.logEvent(`User ${userId} just logged a jab for ${jabType} ${jabDose}!`);

        return await jabRepo.createJab(date, jabType, jabDose, userId).catch(err => console.log(err));
    }

    /**
     * deletes a jab object.
     *
     * @returns {Promise<>}
     * @param id
     */
    async deleteJab(id) {
        if (!id) {
            let error = {status: "failed to delete jab\n", reason: "Id was invalid"};
            console.log(error.status + error.reason);
            return error;
        }
        jabRepo.deleteJab(id).catch(err => console.log(err));
    }

    /**
     * Updates the jab specified by id with new values
     *
     * @param id    - email settings' database id
     * @param date
     * @param jabType
     */
    async updateJab(id, date, jabType) {
        await jabRepo.updateJab(id, date, jabType).catch(err => console.log(err));
        return await this.getJab(id).catch(err => console.log(err));
    }

    /**
     * Retrieves all jabs
     *
     * @returns {Promise<[]>}
     */
    async getAllJabs() {
        return await jabRepo.getAllJabs().catch(error => console.log(error));
    }

    /**
     * Retrieves all jabs for a user
     *
     * @returns {Promise<[]>}
     */
    async getJabsByUser(userId) {
        return await jabRepo.getJabsByUser(userId).catch(error => console.log(error));
    }

    /**
     * Retrieves a jab
     *
     * @returns {Promise<void>}
     */
    async getJab(id) {
        console.log(`Getting jab ${id}...`);
        return await jabRepo.getJab(id).catch(error => console.log(error));
    }
}


module.exports = new JabService();