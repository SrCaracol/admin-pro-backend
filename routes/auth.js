const {Router} = require('express');
const{login, loginGoogle, renewToken} = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/',
    [
        check('email', "El email es obligatorio").isEmail(),
        check('password', "El password es obligatorio").notEmpty(),
        validarCampos
    ],login
);

router.post('/google',
    [
        check('id_token', "El id_token es obligatorio").notEmpty(),
        validarCampos
    ],loginGoogle
);

router.get('/renew',validarJWT
    ,renewToken
);


module.exports = router;