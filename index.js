import express from 'express';//ecmascript 6
//const express = require('express');//ecmascript 5
import morgan from 'morgan';
//const morgan = require('morgan');//Morgan permite ver ls solicitudes que se hacen al servidor mediante consola

import cors from 'cors';
//const cors=require('cors');
//Los middlewares son funciones que se ejecutan antes de que la soulicitud llegue a las rutas
//cors es un packete nodejs para proporcionr un middleware connect express que 
//se usa para habilitar cors con varias 
//opciones, en este caso usamos cors para permitir que 
//se realicen peticiones a nuestro servidor desde otras computadoras

import path from 'path';
import mongoose from 'mongoose';
import router from './routes';//Importamos archivo de gestion de rutas


mongoose.Promise = global.Promise;
//Conexión a la BD
const dbURL = 'mongodb://localhost:27017/dbsistema';
mongoose.connect(dbURL, {useCreateIndex: true, useNewUrlParser: true})
.then(mongoose => console.log('Conectando a la BD en el puerto 27017'))
.catch(err => console.log(err));

const app = express();//Objeto que instancia a express
app.use(morgan('dev'));//morgan('dev') es para indicar que se esta trabajando en modo desarrollo
app.use(cors());
//middleware express json, esto para recibir 
//datos mediante json de un formulario
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//Se establece la ruta de la carpeta de archivos estaticos (public)
//de esta forma el servidor sabe que carpeta contiene
//el index.html que le va a enviar al cliente
//para que sea renderizado en el navegador
app.use(express.static(path.join( __dirname, 'public')));

//
app.use('/api', router);//Cuando se acceda a /api 
//Configuración del puerto del servidor
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), ()=>{
    console.log('server on port ' + app.get('port'));
});

//Agregndo middlewares