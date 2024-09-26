const express = require('express')
const app = express()
const port = 8080
const swaggerUI = require('swagger-ui-express')
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load('./docs/swagger.yaml');

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

// GET-запрос для получения всех игр
app.get('/games', (req, res) => {
    res.send(games)
})

// GET-запрос для получения игры по ID
app.get('/games/:id', (req, res) => {
    const game = games.find(g => g.id == req.params.id);
    if (!game) {
        return res.status(404).send({error: "Game not found"});
    }
    res.send(game);
})

// Инициализация переменной для следующего ID
let nextId = games.length > 0 ? Math.max(...games.map(g => g.id)) + 1 : 1;

// POST-запрос для добавления новой игры
app.post('/games', (req, res) => {
    // Проверяем наличие всех параметров
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({error: 'One or all params are missing'});
    }

    // Создание нового объекта игры
    const game = {
        id: nextId++, // Генерация нового ID
        price: parseFloat(req.body.price), // Преобразуем цену в число
        name: req.body.name
    };

    // Добавляем новую игру в массив
    games.push(game);

    // Возвращаем статус 201 и отправляем новую игру в ответе
    res.status(201)
        .location(`${getBaseUrl(req)}/games/${game.id}`) // Указываем новый URL игры
        .send(game);
});

// Swagger-документация
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Запуск сервера
app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
});

// Функция для получения базового URL
function getBaseUrl(req) {
    return req.connection && req.connection.encrypted
        ? 'https://' 
        : 'http://' + req.headers.host;
}
