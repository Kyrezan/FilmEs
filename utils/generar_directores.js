const mongoose = require('mongoose');
const Director = require(__dirname + '/../models/director');

mongoose.connect('mongodb://localhost:27017/FilmEsV3');
Director.collection.drop();

function generarDirectores() {
    let dir1 = new Director({
        nombre: 'Kevin',
        nacimiento: '1976/02/06'
    });
    dir1.save();
    
    let dir2 = new Director({
        nombre: 'Sergio',
        nacimiento: '1968/03/20'
    });
    dir2.save();
    
    let dir3 = new Director({
        nombre: 'Russo',
        nacimiento: '1972/06/09'
    });
    dir3.save();
    
    let dir4 = new Director({
        nombre: 'James',
        nacimiento: '1980/01/12'
    });
    dir4.save();
}

module.exports = {
    generarDirectores:generarDirectores
}