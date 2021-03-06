const authService = require('../services/authService.js');
const jabService = require('../services/jabService.js');
const {notifyAdmin} = require("../services/notificationService");
const {validateParams} = require("../util.js");

module.exports = {

    /**
     * ENDPOINT: /api/createJab
     * creates a jab.
     * looks for data in the form {
     *     date: date,
     *     type: jab type,
     *     value: jab dose
     * }
     *
     * @returns {Promise<[]>}
     */
    createJab: async (req, res) => {
        console.log(req)
        console.log("creating jab...");

        let validationResult = await validateParams(
            {
                "present": ["date", "type", "value"]
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

            res.send(await jabService.createJab(req.body.date, req.body.type, req.body.value, user.id));
        }
    },

    /**
     * ENDPOINT: /api/getJabsByUser
     *
     * @returns {Promise<>}
     */
    getJabsByUser: async (req, res) => {
        console.log("Dereferencing cookie...");
        console.log(req.body);

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
            res.send(await jabService.getJabsByUser(user.id));
        }
    },

    /**
     * ENDPOINT: /api/getMyJabs
     *
     * @returns {Promise<>}
     */
    getMyJabs: async (req, res) => {
        console.log("Dereferencing cookie...");
        console.log(req.body);

        let validationResult = await validateParams(
            {
                "present": []
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
            res.send(await jabService.getJabsByUser(user.id));
        }
    }
};