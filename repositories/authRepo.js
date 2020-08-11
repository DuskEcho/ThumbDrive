const repoMaster = require('./repoMaster.js');
const {logCaughtError} = require('../util.js');
const Session = require('../domain/entity/session.js');

class AuthRepository {
    constructor() {
    };

    async createSession(email, startDate,  exp){
        let sql = `INSERT INTO sessions (email, start_date, exp) VALUES (?, ?, ?)`;
        let sqlParams = [email, startDate, exp];
        let result;
        result = await repoMaster.query(sql, sqlParams).catch(error => {
            logCaughtError(error);
            result = false;
        });

        return await this.getSessionById(result.insertId);
    }

    async updateSession(id, email, startDate, exp){
        let sql = `UPDATE sessions SET email = ?, start_date = ?, exp = ? WHERE id = ?`;
        let sqlParams = [email, startDate, exp, id];
        let result;
        result = await repoMaster.query(sql, sqlParams).catch(error => {
            logCaughtError(error);
            result = false;
        });

        return await this.getSessionById(id);
    }

    async getEmailFromSession(id){
        let sql = 'SELECT * FROM sessions WHERE id = ?';
        let sqlParams = [id];
        console.log("dereferencing cookie...");

        let result;
        result = await repoMaster.query(sql, sqlParams).catch(error => {
            logCaughtError(error);
            result = [];
        });
        if (result.length > 0){
            return result[0].email;
        }
        return false;
    }

    async getSessionById(id){
        let sql = 'SELECT * FROM sessions WHERE id = ?';
        let sqlParams = [id];
        console.log("dereferencing cookie...");

        let result;
        result = await repoMaster.query(sql, sqlParams).catch(error => {
            logCaughtError(error);
            result = [];
        });
        if (result.length > 0){
            return new Session(result[0].id, result[0].email, result[0].start_date, result[0].exp);
        }
        return false;
    }

    async getSessionByEmail(email){
        let sql = 'SELECT * FROM sessions WHERE email = ?';
        let sqlParams = [email];
        console.log("dereferencing cookie...");

        let result;
        result = await repoMaster.query(sql, sqlParams).catch(error => {
            logCaughtError(error);
            result = [];
        });
        if (result.length > 0){
            return new Session(result[0].id, result[0].email, result[0].start_date, result[0].exp);
        }
        return false;
    }
}

module.exports = new AuthRepository();