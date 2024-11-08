const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

//Crear el servidor de express
const app = express();

//Cors
app.use(cors());

//Base de datos
dbConnection();

//Rutas
app.get('/', (req, res) => {
    ok:true
    msg: 'Hola Mundo'

});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});
//Mongo cluster albeldocarlitos YnNpTpibVLi8vfEC