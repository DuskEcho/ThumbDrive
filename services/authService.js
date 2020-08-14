

const util = require('util');
const request = util.promisify(require('request'));
const authRepo = require('../repositories/authRepo.js');
const {OAuth2Client} = require('google-auth-library');
const moment = require('moment');
const clientId = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(clientId);
const SESSION_LENGTH_DAYS = 7;


class AuthService {
    constructor() {
    };


    /**
     * Checks to see if the credentials belong to the master
     * @param creds - credentials to be checked
     * @returns {Promise<boolean>}
     */
    async accessorIsMaster(creds) {
        return creds === process.env.THUMBDRIVE_MASTER_AUTH;
    }


    /**
     * Checks if the credentials belong to a user
     * @param creds - credentials to be checked
     * @returns {Promise<boolean>}
     */
    async accessorIsUser(creds) {
        if (creds === process.env.THUMBDRIVE_MASTER_AUTH) {
            return  false;
        }
        console.log("Let's see if you are a user...");
        let email = await this.getEmailFromToken(creds).catch(err => console.log(err));
        return await this.emailIsUser(email).catch(err => console.log(err));
    }

    async getUserFromEmail(email){
        let response = await request({
            method: 'POST',
            uri: `${process.env.THUMBDRIVE_URL}/api/getAllUsers`,
            form: {
                'auth': process.env.THUMBDRIVE_MASTER_AUTH
            }
        }).catch(err => console.log(err));

        let users;
        try{
            users = JSON.parse(response.body);
        }
        catch (e) {
            console.log(e);
            users = [];
        }

        for (let user of users){
            if (user.email.toString() === email.toString()){
                return user;
            }
        }

        return {id: "Not found", email: "Not found", userType: "Not found"};
    }

    /**
     * Determines if the given email is on the list of users
     * emails
     * @param email
     * @returns {Promise<boolean>}
     */
    async emailIsUser(email){
        if (!email) {
            return false;
        }
        let response = await request({
            method: 'POST',
            uri: `${process.env.THUMBDRIVE_URL}/api/getAllUsers`,
            form: {
                'auth': process.env.THUMBDRIVE_MASTER_AUTH
            }
        }).catch(err => console.log(err));

        let users;
        try{
            users = JSON.parse(response.body);
        }
        catch (e) {
            let tracer = new Error();
            console.log(e);
            console.log(tracer.stack);
            return false;
        }

        for (let i = 0; i < makers.length; ++i) {
            if (users[i].email.toLowerCase() === email.toLowerCase()) {
                return true
            }
        }
        console.log("Not a User");
        return false;
    }


    async updateValidatedUserSession(email){
        let session = await authRepo.getSessionByEmail(email);
        if (!session){
            let currentDate = moment().utc().utcOffset("-07:00");
            let expireDate = moment().utc().utcOffset("-07:00").add(SESSION_LENGTH_DAYS, "days");
            session = await authRepo.createSession(email,
                currentDate.format("YYYY-MM-DD HH:mm:ss").toString(),
                expireDate.format("YYYY-MM-DD HH:mm:ss").toString());
        }else{
            let currentDate = moment().utc().utcOffset("-07:00");
            let expireDate = moment().utc().utcOffset("-07:00").add(SESSION_LENGTH_DAYS, "days");
            session = await authRepo.updateSession(session.id, session.email,
                currentDate.format("YYYY-MM-DD HH:mm:ss").toString(),
                expireDate.format("YYYY-MM-DD HH:mm:ss").toString());
        }
        return session;
    }

    /**
     * Checks if the credentials belong to a user
     * @param session - session to be checked
     * @param creds - credentials to be checked
     * @returns {Promise<boolean>}
     */
    async sessionIsUser(session, creds) {
        if (creds === process.env.THUMBDRIVE_MASTER_AUTH) {
            return  false;
        }
        console.log("Let's see if you are a user...");
        let email = await authRepo.getEmailFromSession(session.thumbdriveId).catch(err => console.log(err));
        return await this.emailIsUser(email).catch(err => console.log(err));
    }


    async grabUserSession(email){
        return await authRepo.getSessionByEmail(email).catch(err => console.log(err));
    }

    async sessionIsValid(session){
        if (!session || !session.startDate || !session.exp || !session.id || !session.email){
            return false;
        }
        let currentDate = moment(session.startDate);
        let expireDate = moment(session.exp);
        return (expireDate.diff(currentDate) > 0)
    }


    /**
     *  Retrieves an email from a google token
     * @param token - google token to be dereferenced
     * @returns {Promise<string|boolean>}
     */
    async getEmailFromToken(token) {
        let payload = await this.getPayloadFromToken(token);
        if (payload) {
            console.log(`Email was: ${payload['email']}`);
            return payload['email'];
        }
        return false;
    }

    async getPayloadFromToken(token){ console.log("getting email from token:");
        if (token === process.env.THUMBDRIVE_MASTER_AUTH){
            console.log("Master auth, no email associated.");
            return;
        }
        console.log(token);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientId
        }).catch(err => console.log(err));
        if (ticket) {
            return ticket.getPayload();
        }
        let message = `Failed to grab email from token. Google's result was ${JSON.stringify(ticket)}`;
        let tracer = new Error();

        console.log(message);
        console.log(tracer.stack);
        return false;
    }

    /**
     *  Retrieves an email from a cookie
     * @param session - session object to be dereferenced
     * @returns {Promise<string|boolean>}
     */
    async getEmailFromCookie(session) {
        console.log(`Getting email from session with id ${session.thumbdriveId}...`);
        let email;
        email = await authRepo.getEmailFromSession(session.thumbdriveId).catch(error => {
            console.log(error);
            email = false;
        });

        return email;
    }
}


module.exports = new AuthService();