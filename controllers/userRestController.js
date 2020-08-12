const authService = require('../services/authService.js');
const userService = require('../services/userService.js');
const {validateParams} = require("../util.js");

module.exports = {

    /**
     * ENDPOINT: /api/getAllUsers
     * gets all users
     *
     * @returns {Promise<[]>}
     */
    getAllUsers: async (req, res) => {
        let validationResult = await validateParams(
            {
                "present": ["auth"]
            }, req.body);
        if (!validationResult.isValid) {
            res.status(400).send({error: "Bad Request", code: 400, details: validationResult.message});
            notifyAdmin({error: "Bad Request", code: 400, details: validationResult.message});
        } else {
            res.send(await userService.getAllUsers());
        }
    },

    /**
     * ENDPOINT: /api/getUser
     *{
     *     id: user id
     *}
     * @returns {Promise<>}
     */
    getUser: async (req, res) => {
        let validationResult = await validateParams(
            {
                "present": ["id"]
            }, req.body);
        if (!validationResult.isValid) {
            res.status(400).send({error: "Bad Request", code: 400, details: validationResult.message});
            notifyAdmin({error: "Bad Request", code: 400, details: validationResult.message});
        } else {
            res.send(await userService.getUser(req.body.id));
        }
    }
};