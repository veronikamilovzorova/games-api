const app = require('express')()
const port = 8080
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger.json');

app.get('/games', (req, res) => {
    res.send(["Witcher 3", "Cyberpunk 2077", "Red Dead Redemption 2", "Elden Ring"]);
});


app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(port, () => {
    console.log('Api up at: http://localhost:${port}')
})

