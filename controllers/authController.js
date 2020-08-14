const authService = require('../services/authService.js');
const landingPageController = require('./landingPageController.js');
const userPageController = require('./userPageController.js');

module.exports = {

    tokenToEmail: async (req, res) => {
        let token = req.body.token;
        let email = await authService.getEmailFromToken(token).catch(error => {console.log(error);});
        res.send(email);
    },


    cookieToEmail: async (req, res) => {
        let email = await authService.getEmailFromCookie(req.session).catch(error => {console.log(error);});
        res.send(email);
    },


    authorizeUser: process.env.THUMBDRIVE_TEST_ENVIRONMENT ? (req, res, next) => {
        console.log("Test env, skipping auth");
        next()
    } : async (req, res, next) => {
        console.log("Attempting to authorize admin...");
        console.log(req.body);
        let isMaster = await authService.accessorIsUser(req.body.auth).catch(error => {console.log(error);});
        let isUser = await authService.sessionIsUser(req.session, req.body.auth).catch(error => {console.log(error);});
        if (req[process.env.TWINBEE_IS_OK] || isMaster || isUser) {
            req[process.env.TWINBEE_IS_OK] = true;
            console.log("Passed auth check");
            next();
        } else {
            console.log("Not authorized as user");
            if (next) {
                console.log("Checking next auth...");
                next()
            } else {
                console.log("All routes failed to authenticate");
                res.send('nope');
            }
        }
    },
    authorizeMaster: process.env.THUMBDRIVE_TEST_ENVIRONMENT ? (req, res, next) => {
        console.log("Test env, skipping auth");
        next()
    } : async (req, res, next) => {
        console.log("Attempting to authorize Master...");
        let isMaster = await authService.accessorIsMaster(req.body.auth).catch(error => {console.log(error);});
        if (req[process.env.TWINBEE_IS_OK] || isMaster) {
            req[process.env.TWINBEE_IS_OK] = true;
            console.log("Passed auth check");
            next();
        } else {
            console.log("Not authorized as Master");
            res.send('nope');
        }
    },


    loginNavigation: async (req, res) => {
        let userToken = req.query.token;
        let good = await authService.accessorIsUser(userToken);
        if (good) {
            req.googlePayload = await authService.getPayloadFromToken(req.query.token);
            let email = req.googlePayload['email'];
            let newSession = await authService.updateValidatedUserSession(email);
            req.session.twinbeeId = newSession.id;
            userPageController.renderLanding(req, res);
        } else {
            landingPageController.renderForbidden(req, res);
        }
    }
};

