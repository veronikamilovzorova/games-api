const express = require('express')
const app = express()
const port = 8080
const swaggerUI = require('swagger-ui-express')
const yamljs = require('yamljs')
const swaggerDocument = yamljs('./docs/swagger.yaml');

app.use(express.json())

const games = [
    {id: 1, name: "Witcher 3", price: 29.99},
    {id: 2, name: "Cyberpunk 2077", price: 59.99},
    {id: 3, name: "Red Dead Redemption 2", price: 24.99},
    {id: 4, name: "Elden Ring", price: 20.99},
    {id: 5, name: "Roblox", price: 0},
    {id: 6, name: "Outlast", price: 69.99},
    {id: 7, name: "Valorant", price: 0},
    {id: 8, name: "Silent Hill", price: 49.99},
    
]

app.get('/games', (req, res) => {
    res.send(games)
})

app.get('/games/:id', (req, res) => {
    res.send(games[req.params.id-1] === 'undefined'); {
        return res.status(404).send({error: "Game not found"})
    }
    res.send(games[req.params.id - 1])
})

app.post('/games', (req, res) => {
    games.push({
        id:games.lenght + 1,
        price: req.body.price,
        name: req.body.name
    })

    res.end()
})




app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(port, () => {
    console.log('Api up at: http://localhost:${port}')
})

