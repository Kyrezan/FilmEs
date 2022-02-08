const express = require('express');
const mongoose = require('mongoose');

let plataformaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    fecha: {
        type: Date,
        min: 0
    },
    cantidad: {
        type: Number,
        default: 0
    },
});

let peliculaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    sinopsis: {
        type: String,
        required: true,
        minlength: 10,
        trim: true
    },
    duracion: {
        type: Number,
        required: true,
        min: 0
    },
    genero: {
        type: String,
        required: true,
        trim: true
    },
    imagen: {
        type: String
    },
    valoracion: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    plataforma: [plataformaSchema],
    director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'director'
    }
});

let pelicula = mongoose.model("peliculas", peliculaSchema);
module.exports = pelicula;