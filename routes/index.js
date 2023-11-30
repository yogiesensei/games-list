const express = require('express')
const router = express.Router()
const service = require('../service')

router.get('/', async function (req, res, next) {
    try {
        res.json(await service.getAllGames(req.query.page))
    } catch (error) {
        console.error('Error while getting all games', error.message)
        next(error)
    }
})

router.get('/:id', async function (req, res, next) {
    try {
        res.json(await service.getSingleGame(req.params.id))
    } catch (error) {
        console.error('Error while getting single game', error.message)
        next(error)
    }
})

router.post('/', async function (req, res, next) {
    try {
        res.json(await service.createGame(req.body))
    } catch (error) {
        console.error('Error while adding game', error.message)
        next(error)
    }
})
router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await service.deleteGame(req.params.id))
    } catch (error) {
        console.error('Error while deleting game', error.message)
        next(error)
    }
})

router.put('/:id', async function (req, res, next) {
    try {
        res.json(await service.editGame(req.params.id, req.body))
    } catch (error) {
        console.error('Error while editing game', error.message)
        next(error)
    }
})

module.exports = router