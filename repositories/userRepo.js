const User = require("../domain/entity/user.js");
const repoMaster = require("./repoMaster.js");

async function createUserFromRow(row){
    return new User(row.id, row.email, row.user_type);
}

async function createUserListFromRows(rows){
    let refinedResult = [];

    for (var i = 0; i < rows.length; ++i) {
        let userObject = await createUserFromRow(rows[i]).catch(error => console.log(error));
        refinedResult.push(userObject);
    }

    return refinedResult;
}

class UserRepository {
    constructor() {
    };

    async createUser(email, userType) {
        let sql = 'INSERT INTO users(email, user_type)' +
            ' VALUES (?, ?)';
        let sqlParams = [email, userType];
        let result;
        result = await repoMaster.query(sql, sqlParams).catch(e => console.log(e));
        console.log(`User ${result.insertId} successfully created`);
        return await this.getUser(result.insertId).catch(e => console.log(e));
    }

    async updateUser(id, email, userType) {
        let sql = 'UPDATE users SET email = ?, user_type = ? WHERE id = ?';
        let sqlParams = [email, userType, id];
        repoMaster.query(sql, sqlParams, function (err, result) {
            if (err) {
                console.log(err);
                return false;
            }
            console.log(`User ${id} successfully updated.`);
            return result;
        });
    }

    async deleteUser(id) {
        let sql = 'DELETE FROM users WHERE id = ?';
        let sqlParams = [id];

        repoMaster.query(sql, sqlParams, function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(`User ${id} successfully deleted.`);
        });
    }

    async getUser(id) {
        let sql = 'SELECT * ' +
            'FROM users ' +
            'WHERE id = ? ORDER BY id DESC';
        let sqlParams = [id];
        let result;
        result = await repoMaster.query(sql, sqlParams).catch(e => {
            console.log(e);
            result = [];
        });
        console.log(`Retrieved user ${id}`);
        return await createUserFromRow(result[0]).catch(error => console.log(error));
    }

    async getAllUsers() {
        let sql = 'SELECT * ' +
            'FROM users ORDER BY id DESC';
        let sqlParams = [];
        let result;
        result = await repoMaster.query(sql, sqlParams).catch(e => {
            console.log(e);
            result = [];
        });

        return await createUserListFromRows(result).catch(e=>console.log(e));
    }
}

module.exports = new UserRepository();