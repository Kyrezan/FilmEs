// Carga de librerías
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
const multer = require('multer');
const session = require('express-session');

// Enrutadores
const peliculas = require(__dirname + '/routes/peliculas');
const auth = require(__dirname + '/routes/auth');
const public = require(__dirname + '/routes/public');

// Conectar con BD en Mongo 
mongoose.connect('mongodb://localhost:27017/FilmEsV3', {useNewUrlParser: true});

// Inicializar Express
let app = express();

app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: false
}));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'njk');

// Cargar middleware body-parser para peticiones POST y PUT
// y enrutadores
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
})
let upload = multer({storage: storage});

app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/', public);
app.use('/admin', peliculas);
app.use('/auth', auth);

// Puesta en marcha del servidor
app.listen(8080);