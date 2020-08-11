const authService = require('../services/authService.js');
const {notifyAdmin} = require("../services/notificationService");
const {validateParams} = require("../util.js");

module.exports = {

    /**
     * ENDPOINT: /api/getEmailFromToken
     * Dereferences a token. Only callable with master auth
     *
     * @returns {Promise<[]>}
     */
    getEmailFromToken: async (req, res) => {
        console.log("Dereferencing token...");

        let validationResult = await validateParams(
            {
                "present": ["auth", "token"]
            }, req.body);
        if (!validationResult.isValid) {
            res.status(400).send({error: "Bad Request", code: 400, details: validationResult.message});
            notifyAdmin({error: "Bad Request", code: 400, details: validationResult.message});
        } else {
            let email = await authService.getEmailFromToken(req.body.token).catch(err => {
                console.log(err);
                notifyAdmin(err.toString())
            });
            res.send(email);
        }
    },

    /**
     * ENDPOINT: /api/dereferenceSession
     * Dereferences a token. Only callable with master auth
     *
     * @returns {Promise<>}
     */
    getEmailFromCookie: async (req, res) => {
        console.log("Dereferencing cookie...");
        console.log(req.body);

        let validationResult = await validateParams(
            {
                "present": ["auth"]
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
            res.send(email);
        }
    }
};