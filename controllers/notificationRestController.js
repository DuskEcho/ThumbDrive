const notificationService = require('../services/notificationService.js');
const {notifyAdmin} = require("../services/notificationService");
const {validateParams} = require("../util.js");
const getSessionFromToken = require('../util.js').dereferenceSession;


module.exports = {
    /**
     * ENDPOINT: /api/notifyAdmin
     * Sends a notification to the developers. Looks for data in the body as follows:
     * {
     *     "auth": authentication credentials; either master or token,
     *     "message": message to be sent
     * }
     * @returns {Promise<[{},...]>}
     */
    notifyAdmin: async (req, res) => {
        console.log("Attempting to notify admin via rest!");
        console.log(req.body);

        let validationResult = await validateParams(
            {
                "present": ["message"],
                "positiveIntegerOnly": [],
                "noSpaces": [],
                "positiveDecimalAllowed": [],
                "decimalAllowed": []
            }, req.body);
        if (!validationResult.isValid) {
            res.status(400).send({error: "Bad Request", code: 400, details: validationResult.message});
            notifyAdmin({error: "Bad Request", code: 400, details: validationResult.message});
        } else {
            notificationService.notifyAdmin(req.body.message);
            res.send({status: "Request Sent"});
        }
    },

    /**
     * ENDPOINT: /api/notifyEvents
     * Sends a notification to the developers. Looks for data in the body as follows:
     * {
     *     "auth": authentication credentials; either master or token,
     *     "message": message to be sent
     * }
     * @returns {Promise<[{},...]>}
     */
    notifyEvents: async (req, res) => {
        console.log("Attempting to notify admin via rest!");
        console.log(req.body);

        let validationResult = await validateParams(
            {
                "present": ["message"],
                "positiveIntegerOnly": [],
                "noSpaces": [],
                "positiveDecimalAllowed": [],
                "decimalAllowed": []
            }, req.body);
        if (!validationResult.isValid) {
            res.status(400).send({error: "Bad Request", code: 400, details: validationResult.message});
            notifyAdmin({error: "Bad Request", code: 400, details: validationResult.message});
        } else {
            notificationService.notifyEvents(req.body.message);
            res.send({status: "Request Sent"});
        }
    }
};