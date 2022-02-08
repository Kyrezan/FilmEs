const express = require('express');
const Pelicula = require(__dirname + './../models/pelicula.js');
const Director = require(__dirname + './../models/director.js');
const auth = require('./../utils/auth');
const generarUsuarios = require('./../utils/generar_usuarios.js');
const generarDirectores = require('./../utils/generar_directores.js');
const multer = require('multer');

generarUsuarios.generarUsuarios();
generarDirectores.generarDirectores();

let autenticacion = auth.autenticacion;

let router = express.Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
    }
  })

let upload = multer({storage: storage});

router.get('/', autenticacion, (req, res) => {
    Pelicula.find().then(resultado => {
        res.render('admin_peliculas', {peliculas: resultado});
    }).catch (error => {
        res.render('admin_error');
    }); 
});

router.get('/peliculas/nueva', autenticacion, (req, res) => {
    Director.find().then(resultado => {
        res.render('admin_peliculas_form', {directores: resultado});
    })
});

router.get('/peliculas/editar/:id', autenticacion, (req, res) => {
    Pelicula.findById(req.params['id']).then(resultado => {
        if (resultado)
        {
            Director.find().then(directores => {
                if (resultado)
                {
                    res.render('admin_peliculas_form', {pelicula: resultado, directores: directores});
                }
                else
                {
                    res.render('admin_peliculas_form', {pelicula: resultado});
                }
            })
        }
        else
        {
            res.render('admin_error', {error: "Película no encontrada"}); 
        }  
    }).catch(error => {
        res.render('admin_error'); 
    }); 
});

router.post('/peliculas', upload.single('imagen'), autenticacion, (req, res) => {
    let nuevaPelicula = new Pelicula({
        titulo: req.body.titulo,
        sinopsis: req.body.sinopsis,
        duracion: req.body.duracion,
        genero: req.body.genero,
        imagen: req.file.filename,
        valoracion: req.body.valoracion,
        plataforma: {
            nombre: req.body.nombre,
            fecha: req.body.fecha,
            cantidad: req.body.cantidad
        },
        director: req.body.director
    });
    nuevaPelicula.save().then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error', {error: "Error añadiendo película"});
    });
});

router.put('/peliculas/:id', autenticacion, (req, res) => {

    Pelicula.findByIdAndUpdate(req.params.id, {
        $set: {
            titulo: req.body.titulo,
            sinopsis: req.body.sinopsis,
            duracion: req.body.duracion,
            genero: req.body.genero,
            valoracion: req.body.valoracion,
            plataforma: {
                nombre: req.body.nombre,
                fecha: req.body.fecha,
                cantidad: req.body.cantidad
            },
            director: req.body.director
        }
    }, {new: true}).then(resultado => {
        if (resultado)
            res.redirect(req.baseUrl);

            /*res.status(200)
               .send({ok: true, resultado: resultado});*/
        else
            res.render('admin_error', {error:"Error eliminando película"});
    }).catch(error => {
        /*res.status(400)
           .send({ok: false, 
                  error:"Error actualizando pelicula"});*/
        res.render('admin_error');
    });
});

router.delete('/peliculas/:id', autenticacion, (req, res) => {

    Pelicula.findByIdAndRemove(req.params.id).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error', {error:"Error eliminando película"});
    });
});

module.exports = router;