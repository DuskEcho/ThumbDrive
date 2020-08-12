const Med = require("../domain/entity/Med.js");
const repoMaster = require("./repoMaster.js");

async function createMedFromRow(row){
    return new Med(row.id, row.date, row.med_type, row.med_dose);
}

async function createMedListFromRows(rows){
    let refinedResult = [];

    for (var i = 0; i < rows.length; ++i) {
        let userObject = await createMedFromRow(rows[i]).catch(error => console.log(error));
        refinedResult.push(userObject);
    }

    return refinedResult;
}

class MedRepository {
    constructor() {
    };

    async createMed(date, medType, medDose, userId) {
        let sql = 'INSERT INTO meds(date, med_type, med_dose, user_id)' +
            ' VALUES (?, ?, ?)';
        let sqlParams = [date, medType, medDose, userId];
        let result;
        result = await repoMaster.query(sql, sqlParams).catch(e => console.log(e));
        console.log(`User ${result.insertId} successfully created`);
        return await this.getMed(result.insertId).catch(e => console.log(e));
    }

    async updateMed(id, date, medType, medDose) {
        let sql = 'UPDATE meds SET date = ?, med_type = ?, med_dose = ? WHERE id = ?';
        let sqlParams = [date, medType, medDose, id];
        repoMaster.query(sql, sqlParams, function (err, result) {
            if (err) {
                console.log(err);
                return false;
            }
            console.log(`Med ${id} successfully updated.`);
            return result;
        });
    }

    async deleteMed(id) {
        let sql = 'DELETE FROM meds WHERE id = ?';
        let sqlParams = [id];

        repoMaster.query(sql, sqlParams, function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(`Med ${id} successfully deleted.`);
        });
    }

    async getMed(id) {
        let sql = 'SELECT * ' +
            'FROM meds ' +
            'WHERE id = ? ORDER BY id DESC';
        let sqlParams = [id];
        let result;
        result = await repoMaster.query(sql, sqlParams).catch(e => {
            console.log(e);
            result = [];
        });
        console.log(`Retrieved med ${id}`);
        return await createMedFromRow(result[0]).catch(error => console.log(error));
    }

    async getMedsByUser(userId) {
        let sql = 'SELECT * ' +
            'FROM meds ' +
            'WHERE user_id = ? ORDER BY id DESC';
        let sqlParams = [userId];
        let result;
        result = await repoMaster.query(sql, sqlParams).catch(e => {
            console.log(e);
            result = [];
        });

        return await createMedListFromRows(result).catch(e=>console.log(e))
    }

    async getAllMeds() {
        let sql = 'SELECT * ' +
            'FROM meds ORDER BY id DESC';
        let sqlParams = [];
        let result;
        result = await repoMaster.query(sql, sqlParams).catch(e => {
            console.log(e);
            result = [];
        });

        return await createMedListFromRows(result).catch(e=>console.log(e))
    }
}

module.exports = new MedRepository();