const express = require('express');
const mongoose = require('mongoose');

let directorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    nacimiento: {
        type: Date,
    },
});

let director = mongoose.model("directores", directorSchema);
module.exports = director;