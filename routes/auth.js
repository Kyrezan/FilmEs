const express = require('express');
const Usuario = require(__dirname + '/../models/usuario');
const CryptoJS = require("crypto-js");

let router = express.Router();

router.get('/login', (req, res) => {
    res.render('auth_login');
});

router.post('/login', (req, res) => {
    Usuario.find().then( resultado => {
        let existeUsuario = resultado.filter(resultado => resultado.login == req.body.login 
            && CryptoJS.AES.decrypt(resultado.password, 'secret key 123').toString(CryptoJS.enc.Utf8) == req.body.password);
        if (existeUsuario.length > 0)
        {
            req.session.login = existeUsuario;
            console.log(req.session.login);
            res.redirect('/admin');
        } else {
            res.render('auth_login', {error: "Usuario o contraseña incorrectos"});
        }
    })
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;