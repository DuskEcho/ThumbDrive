const util = require('util');
const backupEmailService = require('./services/notificationService.js');
const request = util.promisify(require('request'));

let validatorMap = {
    "present": async function (keysToValidate, body) {
        let valid = {isValid: true, message: ""};
        for (var keyString of keysToValidate) {
            if (!body[keyString]) {
                valid.isValid = false;
                valid.message += `${keyString} was not valid.  `;
            }
        }
        return valid;
    },
    "positiveIntegerOnly": async function (keysToValidate, body) {
        let valid = {isValid: true, message: ""};
        for (var keyString of keysToValidate) {
            if (!body[keyString] || !Number.parseInt(body[keyString])
                || body[keyString].toString().includes("-") || body[keyString].toString().includes(" ") || body[keyString].toString().includes(".")) {
                valid.isValid = false;
                valid.message += `${keyString} was not valid.  `;
            }
        }
        return valid;
    },
    "noSpaces": async function (keysToValidate, body) {
        let valid = {isValid: true, message: ""};
        for (var keyString of keysToValidate) {
            if (!body[keyString] || body[keyString].includes(" ")) {
                valid.isValid = false;
                valid.message += `${keyString} was not valid.  `;
            }
        }
        return valid;
    },
    "positiveDecimalAllowed": async function (keysToValidate, body) {
        let valid = {isValid: true, message: ""};
        for (var keyString of keysToValidate) {
            if (!body[keyString] || !Number.parseFloat(body[keyString])
                || body[keyString].includes("-")) {
                valid.isValid = false;
                valid.message += `${keyString} was not valid.  `;
            }
        }
        return valid;
    },
    "decimalAllowed": async function (keysToValidate, body) {
        let valid = {isValid: true, message: ""};
        for (var keyString of keysToValidate) {
            if (!body[keyString] || !Number.parseFloat(body[keyString])) {
                valid.isValid = false;
                valid.message += `${keyString} was not valid.  `;
            }
        }
        return valid;
    },
};


module.exports = {

    /**
     *  validates parameters
     * {
     *      present: array of string keys that should be present
     *      positiveIntegerOnly: array of string keys that should parse to positive integers only,
     *      noSpaces: array of string keys that should not have spaces
     * }
     *
     * @returns object in the form:
     * {
     *      isValid: a boolean indicating whether or not the parameters were valid
     *      message: a string description of the result
     * }
     */
    validateParams: async (paramArrayMap, body)=> {
        let validator = {isValid: true, message: ""};
        let paramsTypesToScan = ["present", "positiveIntegerOnly", "noSpaces", "positiveDecimalAllowed", "decimalAllowed"];
        for (var paramName of paramsTypesToScan) {
            let keyArray = paramArrayMap[paramName];
            if (keyArray) {
                let result = await validatorMap[paramName](keyArray, body);
                if (!result.isValid) {
                    validator.isValid = false;
                    validator.message += result.message;
                }
            }
        }
        if (!validator.message) {
            validator.message = "Valid";
        }
        if (!validator.isValid) {
            let tracer = new Error();
            console.log(`Failed to validate! \nParameters:\n${JSON.stringify(paramArrayMap)}\nBody:\n${JSON.stringify(body)}\nTrace coming shortly.`);
            console.log(tracer.stack);
        }
        return validator;
    },

    dereferenceToken: async (token) =>{
        let response = await request({
            method: 'POST',
            uri: `${process.env.THUMBDRIVE_URL}/api/dereferenceToken`,
            form: {
                'auth': process.env.THUMBDRIVE_MASTER_AUTH,
                'token': token
            }
        }).catch(err => console.log(err));

        return response.body;
    },

    dereferenceSession: async (session) =>{
        let response = await request({
            method: 'POST',
            uri: `${process.env.THUMBDRIVE_URL}/api/dereferenceSession`,
            form: {
                'auth': process.env.THUMBDRIVE_MASTER_AUTH,
                'session': JSON.stringify(session)
            }
        }).catch(err => console.log(err));

        return response.body;
    },

    logCaughtError: (error, toTraceOrNotToTrace) =>{
        console.log(error);
        if (toTraceOrNotToTrace !== true && toTraceOrNotToTrace !== false){
            toTraceOrNotToTrace = true;
        }

        let message = "";
        if (error.message){
            message += `error.message: ${error.message}\n`;
        }
        if (error.stack){
            message += `error.stack: ${error.stack}\n`;
        }
        if (toTraceOrNotToTrace){
            message += `New trace: ${new Error().stack}\n`
        }

        request({
            method: 'POST',
            uri: `${process.env.THUMBDRIVE_URL}/api/notifyAdmin`,
            form: {
                'auth': process.env.THUMBDRIVE_MASTER_AUTH,
                'message': `object: ${error}\n${message}`
            }
        }).catch(err => {
            console.log(err);
            backupEmailService.notifyAdmin(err);
        });
    },

    logEvent: (message) =>{
        request({
            method: 'POST',
            uri: `${process.env.THUMBDRIVE_URL}/api/logEvent`,
            form: {
                'auth': process.env.THUMBDRIVE_MASTER_AUTH,
                'message': message
            }
        }).catch(err => {
            console.log(err);
            backupEmailService.notifyAdmin(err);
        });
    }
};