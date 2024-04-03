const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

let homeView = 0;
let aboutView = 0;

if (fs.existsSync('./view.json')) {
  const view = JSON.parse(fs.readFileSync('./view.json', 'utf8'));
  homeView = view.home;
  aboutView = view.about;
}

app.get('/', (req, res) => {
  homeView++;
  fs.writeFileSync('./view.json', JSON.stringify({ home: homeView, about: aboutView }), 'utf8');
    res.send(`<a href="/about">Ссылка на страницу "/about"</a> <br>
    Просмотров страницы "Home" : ${homeView}`);
});

app.get('/about', (req, res) => {
  aboutView++;
  fs.writeFileSync('./view.json', JSON.stringify({ home: homeView, about: aboutView }), 'utf8');
    res.send(`<a href="/">Ссылка на страницу "/"</a> <br>
  Просмотров страницы "About": ${aboutView}`);
});


app.listen(port, () => {
  console.log(`Сервер поднят! http://localhost:${port}`);
});