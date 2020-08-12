const authService = require('../services/authService.js');
const readingService = require('../services/readingService.js');
const {notifyAdmin} = require("../services/notificationService");
const {validateParams} = require("../util.js");

module.exports = {

    /**
     * ENDPOINT: /api/createReading
     * creates a reading.
     * looks for data in the form {
     *     date: date,
     *     readingType: reading type,
     *     numbers: reading's value
     * }
     *
     * @returns {Promise<[]>}
     */
    createReading: async (req, res) => {
        console.log("creating reading...");

        let validationResult = await validateParams(
            {
                "present": ["date", "readingType", "numbers"]
            }, req.body);
        if (!validationResult.isValid) {
            res.status(400).send({error: "Bad Request", code: 400, details: validationResult.message});
            notifyAdmin({error: "Bad Request", code: 400, details: validationResult.message});
        } else {
            let email = await authService.getEmailFromCookie(req.session).catch(err => {
                console.log(err);
                notifyAdmin(err.toString())
            });
            let user = await authService.getUserFromEmail(email);
            res.send(await readingService.createReading(req.body.date, req.body.numbers, req.body.readingType, user.id));
        }
    },

    /**
     * ENDPOINT: /api/getReadingsByUser
     *
     * @returns {Promise<>}
     */
    getReadingsByUser: async (req, res) => {
        let validationResult = await validateParams(
            {
                "present": []
            }, req.body);
        if (!validationResult.isValid) {
            res.status(400).send({error: "Bad Request", code: 400, details: validationResult.message});
            notifyAdmin({error: "Bad Request", code: 400, details: validationResult.message});
        } else {
            let session = JSON.parse(req.body.session);
            let email = await authService.getEmailFromCookie(session).catch(err => {
                console.log(err);
                notifyAdmin(err.toString())
            });
            let user = await authService.getUserFromEmail(email);
            res.send(await readingService.getReadingsByUser(user.id));
        }
    }
};