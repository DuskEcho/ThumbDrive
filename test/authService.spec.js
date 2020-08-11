const sinon = require('sinon');
const {expect} = require('chai');
const nock = require('nock');
const moment = require('moment');
const authService = require('../services/authService.js');
const authRepo = require('../repositories/authRepo.js');
const Session = require('../domain/entity/session.js');

describe("UpdateUserSession Tests", function () {
    beforeEach(function () {

    });
    afterEach(function () {
        sinon.restore();
    });

    it('Should update an existing session', async function () {
        sinon.stub(authRepo, "getSessionByEmail").callsFake(function () {
            return new Promise((resolve, reject) => {
                resolve(new Session(1, "email", "startDate", "exp"))
            })
        });
        sinon.stub(authRepo, "createSession").callsFake(function () {

        });
        sinon.stub(authRepo, "updateSession").callsFake(function (id, email, startDate, exp) {
            return new Promise((resolve, reject) => {
                resolve(new Session(id, email, startDate, exp))
            })
        });

        let actual = await authService.updateValidatedUserSession("email");
        expect(actual.startDate).to.not.equal("startDate");
        sinon.assert.notCalled(authRepo.createSession)
    });

    it('Should instantiate a new session', async function () {
        let startDateTest;
        sinon.stub(authRepo, "getSessionByEmail").callsFake(function () {
            return new Promise((resolve, reject) => {
                resolve(false)
            })
        });
        sinon.stub(authRepo, "createSession").callsFake(function (email, startDate, exp) {
            return new Promise((resolve, reject) => {
                startDateTest = startDate;
                resolve(new Session(1, email, startDate, exp))
            })
        });
        sinon.stub(authRepo, "updateSession").callsFake(function (id, email, startDate, exp) {
            return new Promise((resolve, reject) => {
            })
        });

        let actual = await authService.updateValidatedUserSession("email");
        expect(actual.startDate).to.equal(startDateTest);
        sinon.assert.notCalled(authRepo.updateSession)
    })
});

describe("sessionIsValid Tests", function () {
    beforeEach(function () {

    });
    afterEach(function () {
        sinon.restore();
    });

    it('Should return false if no the session is expired', async function () {
        let now = moment.utc().utcOffset("-07:00").format("YYYY-MM-DD HH:mm:ss");
        let twoDaysAgo = moment.utc().utcOffset("-07:00").subtract(2, "days").format("YYYY-MM-DD HH:mm:ss");
        let testSession = new Session(1, "email", now, now);
        let testSession2 = new Session(2, "email2", now, twoDaysAgo);
        let actual = await authService.sessionIsValid(testSession);
        let actual2 = await authService.sessionIsValid(testSession2);
        expect(actual).to.deep.equal(false);
        expect(actual2).to.deep.equal(false);
    });

    it('Should instantiate a new session', async function () {
        let startDateTest;
        sinon.stub(authRepo, "getSessionByEmail").callsFake(function () {
            return new Promise((resolve, reject) => {
                resolve(false)
            })
        });
        sinon.stub(authRepo, "createSession").callsFake(function (email, startDate, exp) {
            return new Promise((resolve, reject) => {
                startDateTest = startDate;
                resolve(new Session(1, email, startDate, exp))
            })
        });
        sinon.stub(authRepo, "updateSession").callsFake(function (id, email, startDate, exp) {
            return new Promise((resolve, reject) => {
            })
        });

        let actual = await authService.updateValidatedUserSession("email");
        expect(actual.startDate).to.equal(startDateTest);
        sinon.assert.notCalled(authRepo.updateSession)
    })
});