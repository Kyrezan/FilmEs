const mongoose = require('mongoose');
const Usuario = require(__dirname + '/../models/usuario');
const CryptoJS = require("crypto-js");

mongoose.connect('mongodb://localhost:27017/FilmEsV3');

Usuario.collection.drop();

function generarUsuarios() {
    let usu1 = new Usuario({
        login: 'user1',
        password: CryptoJS.AES.encrypt('12345678', 'secret key 123').toString()
    });
    usu1.save();
    
    let usu2 = new Usuario({
        login: 'christian',
        password: CryptoJS.AES.encrypt('12345678', 'secret key 123').toString()
    });
    usu2.save();
}

module.exports = {
    generarUsuarios:generarUsuarios
}