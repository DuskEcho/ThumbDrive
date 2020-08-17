const util = require('util');
const request = util.promisify(require('request'));
const readingRepo = require('../repositories/readingRepo.js');
const myUtil = require('../util.js');


class ReadingService {
    constructor() {
    };

    /**
     * Instantiates and returns a reading object.
     *
     * @returns {Promise<>}
     * @param date
     * @param numbers
     * @param readingType
     * @param userId
     */
    async createReading(date, numbers, readingType, userId) {
        if (!date || !readingType) {
            let error = {status: "failed to create reading\n", reason: ""};
            error.reason += date ? "" : "date was invalid\n";
            error.reason += readingType ? "" : "readingType was invalid\n";

            console.log(error.status + error.reason);
            return error;
        }

        myUtil.logEvent(`User ${userId} just logged a reading for ${readingType}! The reading was logged as ${numbers}.`);
        return await readingRepo.createReading(date, numbers, readingType, userId).catch(err => console.log(err));
    }

    /**
     * deletes a reading object.
     *
     * @returns {Promise<>}
     * @param id
     */
    async deleteReading(id) {
        if (!id) {
            let error = {status: "failed to delete reading\n", reason: "Id was invalid"};
            console.log(error.status + error.reason);
            return error;
        }
        readingRepo.deleteReading(id).catch(err => console.log(err));
    }

    /**
     * Updates the reading specified by id with new values
     *
     * @param id    - email settings' database id
     * @param date
     * @param readingType
     */
    async updateReading(id, date, readingType) {
        await readingRepo.updateReading(id, date, readingType).catch(err => console.log(err));
        return await this.getReading(id).catch(err => console.log(err));
    }

    /**
     * Retrieves all Readings
     *
     * @returns {Promise<[]>}
     */
    async getAllReadings() {
        return await readingRepo.getAllReadings().catch(error => console.log(error));
    }

    /**
     * Retrieves all Readings for a user
     *
     * @returns {Promise<[]>}
     */
    async getReadingsByUser(userId) {
        return await readingRepo.getReadingsByUser(userId).catch(error => console.log(error));
    }

    /**
     * Retrieves a reading
     *
     * @returns {Promise<void>}
     */
    async getReading(id) {
        console.log(`Getting reading ${id}...`);
        return await readingRepo.getReading(id).catch(error => console.log(error));
    }
}


module.exports = new ReadingService();