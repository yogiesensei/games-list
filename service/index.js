const db = require('./db')
const helper = require('../helper')
const config = require('../config')

async function getAllGames(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage)
    const data = await db.query(
        `SELECT * FROM games LIMIT ${offset}, ${config.listPerPage}`
    )
    const result = helper.isEmpty(data)
    const meta = {
        page
    }

    if (data.length) {
        return {
            ...helper.requestSuccess('Success get all games', false, result)
        }
    } else {
        return {
            ...helper.requestFail('Fail to get all games')
        }
    }
}

async function getSingleGame(id) {
    const data = await db.query(
        `SELECT * FROM games WHERE id=${id}`
    )
    const result = helper.isEmpty(data)


    if (data.length) {
        return {
            ...helper.requestSuccess('Success get single game', false, result)
        }
    } else {
        return {
            ...helper.requestFail('Fail to get single game')
        }
    }
}

async function createGame(data) {
    const result = await db.query(
        `INSERT INTO games (title, image, platform, year) VALUES ('${data.title}','${data.image}','${data.platform}','${data.year}')`
    )

    let message = 'Error in adding game'

    if (result.affectedRows) {
        message = 'Success in adding game'
        return {
            ...helper.requestSuccess(message, true)
        }
    } else {
        return {
            ...helper.requestFail('Fail to add game')
        }
    }
}

async function deleteGame(id) {
    const result = await db.query(
        `DELETE FROM games WHERE id=${id}`
    )

    let message = 'Error in deleting game'

    if (result.affectedRows) {
        message = 'Success in deleting game'
        return {
            ...helper.requestSuccess(message, true)
        }
    } else {
        return {
            ...helper.requestFail('Fail to delete game')
        }
    }
}

async function editGame(id, data) {
    const result = await db.query(
        `UPDATE games SET title='${data.title}',image='${data.image}',platform='${data.platform}',year='${data.year}' WHERE id='${id}'`
    )

    let message = 'Error in editing game'

    if (result.affectedRows) {
        message = 'Success in editing game'
        return {
            ...helper.requestSuccess(message, true)
        }
    } else {
        return {
            ...helper.requestFail('Fail to edit game')
        }
    }
}

module.exports = {
    getAllGames,
    getSingleGame,
    createGame,
    deleteGame,
    editGame
}