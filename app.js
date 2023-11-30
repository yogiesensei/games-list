const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
const router = require('./routes')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: 'OK'
    })
})

app.use('/games', router)

app.use((err, req, res, next) => {
    const status = err.statusCode || 500
    console.error(err.message, err.stack)
    res.status(status).json({
        message: err.message
    })
})

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})