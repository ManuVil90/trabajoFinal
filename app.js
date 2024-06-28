const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let comments = []; 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/signup', (req, res) => {
    const userName = req.body.name;
    res.redirect(`/success?name=${encodeURIComponent(userName)}`);
});

app.get('/success', (req, res) => {
    const userName = req.query.name;
    res.render('success', { name: userName, comments: comments });
});

app.post('/comment', (req, res) => {
    const comment = {
        name: req.body.name,
        comment: req.body.comment
    };
    comments.push(comment);
    res.redirect('back'); 
});

const PORT = 3001; 
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
