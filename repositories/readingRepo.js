const Reading = require("../domain/entity/reading.js");
const repoMaster = require("./repoMaster.js");

async function createReadingFromRow(row){
    return new Reading(row.id, row.date, row.reading_type, row.numbers);
}

async function createReadingListFromRows(rows){
    let refinedResult = [];

    for (var i = 0; i < rows.length; ++i) {
        let userObject = await createReadingFromRow(rows[i]).catch(error => console.log(error));
        refinedResult.push(userObject);
    }

    return refinedResult;
}

class ReadingRepository {
    constructor() {
    };

    async createReading(date, numbers, readingType, userId) {
        let sql = 'INSERT INTO readings(date, numbers, reading_type, user_id)' +
            ' VALUES (?, ?, ?, ?)';
        let sqlParams = [date, numbers, readingType, userId];
        let result;
        result = await repoMaster.query(sql, sqlParams).catch(e => console.log(e));
        console.log(`User ${result.insertId} successfully created`);
        return await this.getReading(result.insertId).catch(e => console.log(e));
    }

    async updateReading(id, date, numbers) {
        let sql = 'UPDATE readings SET date = ?, numbers = ? WHERE id = ?';
        let sqlParams = [date, numbers, id];
        repoMaster.query(sql, sqlParams, function (err, result) {
            if (err) {
                console.log(err);
                return false;
            }
            console.log(`Reading ${id} successfully updated.`);
            return result;
        });
    }

    async deleteReading(id) {
        let sql = 'DELETE FROM readings WHERE id = ?';
        let sqlParams = [id];

        repoMaster.query(sql, sqlParams, function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(`Reading ${id} successfully deleted.`);
        });
    }

    async getReading(id) {
        let sql = 'SELECT * ' +
            'FROM readings ' +
            'WHERE id = ? ORDER BY id DESC';
        let sqlParams = [id];
        let result;
        result = await repoMaster.query(sql, sqlParams).catch(e => {
            console.log(e);
            result = [];
        });
        console.log(`Retrieved reading ${id}`);
        return await createReadingFromRow(result[0]).catch(error => console.log(error));
    }

    async getReadingsByUser(userId) {
        let sql = 'SELECT * ' +
            'FROM readings ' +
            'WHERE user_id = ? ORDER BY id DESC';
        let sqlParams = [userId];
        let result;
        result = await repoMaster.query(sql, sqlParams).catch(e => {
            console.log(e);
            result = [];
        });

        return await createReadingListFromRows(result).catch(e=>console.log(e))
    }

    async getAllReadings() {
        let sql = 'SELECT * ' +
            'FROM readings ORDER BY id DESC';
        let sqlParams = [];
        let result;
        result = await repoMaster.query(sql, sqlParams).catch(e => {
            console.log(e);
            result = [];
        });

        return await createReadingListFromRows(result).catch(e=>console.log(e));
    }
}

module.exports = new ReadingRepository();