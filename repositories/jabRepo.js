const Jab = require("../domain/entity/jab.js");
const repoMaster = require("./repoMaster.js");

async function createJabFromRow(row){
    return new Jab(row.id, row.date, row.jab_type, row.jab_dose);
}

async function createJabListFromRows(rows){
    let refinedResult = [];

    for (var i = 0; i < rows.length; ++i) {
        let userObject = await createJabFromRow(rows[i]).catch(error => console.log(error));
        refinedResult.push(userObject);
    }

    return refinedResult;
}

class JabRepository {
    constructor() {
    };

    async createJab(date, jabType, jabDose, userId) {
        let sql = 'INSERT INTO jabs(date, jab_type, jab_dose, user_id)' +
            ' VALUES (?, ?, ?, ?)';
        let sqlParams = [date, jabType, jabDose, userId];
        let result;
        result = await repoMaster.query(sql, sqlParams).catch(e => console.log(e));
        console.log(`User ${result.insertId} successfully created`);
        return await this.getJab(result.insertId).catch(e => console.log(e));
    }

    async updateJab(id, date, jabType, jabDose) {
        let sql = 'UPDATE jabs SET date = ?, jab_type = ?, jab_dose = ? WHERE id = ?';
        let sqlParams = [date, jabType, jabDose, id];
        repoMaster.query(sql, sqlParams, function (err, result) {
            if (err) {
                console.log(err);
                return false;
            }
            console.log(`Jab ${id} successfully updated.`);
            return result;
        });
    }

    async deleteJab(id) {
        let sql = 'DELETE FROM jabs WHERE id = ?';
        let sqlParams = [id];

        repoMaster.query(sql, sqlParams, function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(`Jab ${id} successfully deleted.`);
        });
    }

    async getJab(id) {
        let sql = 'SELECT * ' +
            'FROM jabs ' +
            'WHERE id = ? ORDER BY id DESC';
        let sqlParams = [id];
        let result;
        result = await repoMaster.query(sql, sqlParams).catch(e => {
            console.log(e);
            result = [];
        });
        console.log(`Retrieved jab ${id}`);
        return await createJabFromRow(result[0]).catch(error => console.log(error));
    }

    async getJabsByUser(userId) {
        let sql = 'SELECT * ' +
            'FROM jabs ' +
            'WHERE user_id = ? ORDER BY id DESC';
        let sqlParams = [userId];
        let result;
        result = await repoMaster.query(sql, sqlParams).catch(e => {
            console.log(e);
            result = [];
        });

        return await createJabListFromRows(result).catch(e=>console.log(e))
    }

    async getAllJabs() {
        let sql = 'SELECT * ' +
            'FROM jabs ORDER BY id DESC';
        let sqlParams = [];
        let result;
        result = await repoMaster.query(sql, sqlParams).catch(e => {
            console.log(e);
            result = [];
        });

        return await createJabListFromRows(result).catch(e=>console.log(e))
    }
}

module.exports = new JabRepository();