//Ruta: /api/usuarios

const {Router} = require('express');

const {check} = require('express-validator');


const{validarCampos} = require('../middlewares/validar-campos');

const {getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario} = require('../controllers/usuarios');

const {validarJWT} = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', validarJWT, getUsuarios);

router.get('/', getUsuarios);

router.post('/',[check('nombre', "El nombre es obligatorio").notEmpty(),check('password', "El password es obligatorio").notEmpty(),check('email', "El email es obligatorio").isEmail(),validarCampos],crearUsuario
);

router.put('/:id',
    [   
        validarJWT,
        check('nombre', "El nombre es obligatorio").notEmpty(),
        check('email', "El email es obligatorio").isEmail(),
        check('role', "El role es obligatorio").notEmpty(),
        validarCampos
    ] ,actualizarUsuario
);

router.delete('/:id',validarJWT, borrarUsuario);

module.exports = router;