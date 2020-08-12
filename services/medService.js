const util = require('util');
const request = util.promisify(require('request'));
const medRepo = require('../repositories/medRepo.js');


class MedService {
    constructor() {
    };

    /**
     * Instantiates and returns a med object.
     *
     * @returns {Promise<>}
     * @param date
     * @param medType
     * @param medDose
     * @param userId
     */
    async createMed(date, medType, medDose, userId) {
        if (!date || !medType) {
            let error = {status: "failed to create med\n", reason: ""};
            error.reason += date ? "" : "date was invalid\n";
            error.reason += medType ? "" : "medType was invalid\n";

            console.log(error.status + error.reason);
            return error;
        }
        return await medRepo.createMed(date, medType, medDose, userId).catch(err => console.log(err));
    }

    /**
     * deletes a med object.
     *
     * @returns {Promise<>}
     * @param id
     */
    async deleteMed(id) {
        if (!id) {
            let error = {status: "failed to delete med\n", reason: "Id was invalid"};
            console.log(error.status + error.reason);
            return error;
        }
        medRepo.deleteMed(id).catch(err => console.log(err));
    }

    /**
     * Updates the med specified by id with new values
     *
     * @param id    - email settings' database id
     * @param date
     * @param medType
     */
    async updateMed(id, date, medType) {
        await medRepo.updateMed(id, date, medType).catch(err => console.log(err));
        return await this.getMed(id).catch(err => console.log(err));
    }

    /**
     * Retrieves all meds
     *
     * @returns {Promise<[]>}
     */
    async getAllMeds() {
        return await medRepo.getAllMeds().catch(error => console.log(error));
    }

    /**
     * Retrieves all meds for a user
     *
     * @returns {Promise<[]>}
     */
    async getMedsByUser(userId) {
        return await medRepo.getMedsByUser(userId).catch(error => console.log(error));
    }

    /**
     * Retrieves a med
     *
     * @returns {Promise<void>}
     */
    async getMed(id) {
        console.log(`Getting med ${id}...`);
        return await medRepo.getMed(id).catch(error => console.log(error));
    }
}


module.exports = new MedService();