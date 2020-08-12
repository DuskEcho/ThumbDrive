const authService = require('../services/authService.js');
const medService = require('../services/medService.js');
const {notifyAdmin} = require("../services/notificationService");
const {validateParams} = require("../util.js");

module.exports = {

    /**
     * ENDPOINT: /api/createMed
     * creates a med.
     * looks for data in the form {
     *     date: date,
     *     medType: med type,
     *     medDose: med dose
     * }
     *
     * @returns {Promise<[]>}
     */
    createMed: async (req, res) => {
        console.log("creating med...");

        let validationResult = await validateParams(
            {
                "present": ["date", "medType", "medDose"]
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

            res.send(await medService.createMed(req.body.date, req.body.medType, req.body.medDose, user.id));
        }
    },

    /**
     * ENDPOINT: /api/getMedsByUser
     *
     * @returns {Promise<>}
     */
    getMedsByUser: async (req, res) => {
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
            res.send(await medService.getMedsByUser(user.id));
        }
    }
};