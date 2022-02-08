const express = require('express');
const Pelicula = require(__dirname + './../models/pelicula.js');

let router = express.Router();

router.get('/', (req, res) => {
    res.render('public_index');
});

router.get('/buscar', (req, res) => {
    Pelicula.find().then(resultado => {
        res.render('public_index', {peliculas: resultado});
    }).catch (error => {
        res.render('public_error', {error: "No se encontraron películas"});
    }); 
});

router.get('/pelicula/:id', (req, res) => {
    Pelicula.findById(req.params.id).then(resultado => {
        if (resultado)
        {
            res.render('public_pelicula', {pelicula: resultado});
        }
        else
        {
            res.render('public_error', {error: "Película no encontrada"}); 
        }  
    }).catch(error => {
        res.render('public_error', {error: "Error en la aplicación"}); 
    }); 
});

module.exports = router;