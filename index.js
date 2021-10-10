/*
  ------------------------------------------
  API REST 
  ------------------------------------------
  NodeJS (lenguaje)
  Express (Servidor Web)
  Navtive Driver (Establece la conexión)
  MongoDB (BDNoSQL)

  
  Instalaciones:
  npm i mongodb express morgan body-parser errorhandler

*/

// IMPORTACIONES
const express = require('express')
const logger = require('morgan')
const mongodb = require('mongodb')
const mongo = mongodb.MongoClient;
const bodyParser = require('body-parser')
const cors = require('cors');
const url = 'mongodb://localhost:27017'

app = express();





// MIDDELWARES
app.use(logger('dev'))
app.use(bodyParser.json())

// CONEXION A LA BASE DE DATOS

mongo.connect(url, (err, con) => {
    //Colección 
    const estudiantesColeccion = con.db('701nosql').collection('estudiantes')

    // Error
    if (err) {
        console.log('No se pudo conectar a la URL ', url)
    }

    // Muestre todos los estudantes 
    app.get('/estudiantes', (req, res) => {
        estudiantesColeccion.find({}).toArray((err, estudiantes) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }

            res.send(JSON.stringify(estudiantes))
        })   
    })


    app.post('/estudiantes', (req, res) => {
        console.log('req.body: ', req.body)
        estudiantesColeccion.insert(req.body, (err, respuesta) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            res.send(JSON.stringify(respuesta))
        })
    })

    app.listen(3000, ()=>{
        console.log('Express server corriendo en el puesto 3000: \x1b[32m','online');
    })

})




/*app.listen(3000, ()=>{
    console.log('Express server corriendo en el puesto 3000: \x1b[32m','online');
});*/