const{response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res= response) => {

    const{email,password}  = req.body;
    try {

        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }
        //Validar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password no valido'
            });
        }

        //Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);


        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }
}

const loginGoogle = async(req, res= response) => {

    try {
        const {email, name, picture} = await googleVerify(re.body.id_token);

        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if(!usuarioDB){
            //Si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        }else{
            //Existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        //Guardar en BD
        await usuario.save();

        //Generar el TOKEN - JWT
        const id_token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            msg: 'Google Signin',
            email, name, picture
            id_token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token no es correcto'
        });
        
    }
    

}
    

module.exports = {
    login,
    loginGoogle
}