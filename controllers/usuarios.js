const Usuario = require('../models/usuario');
const {response} = require('express');
const bcrypt = require('bcryptjs');

const getUsuarios = async(req, res) => {
    const desde = Number(req.query.desde) || 0;

   /* const usuarios = await Usuario
                            .find({}, 'nombre email role google')
                            .skip(desde)
                            .limit(5);

    const total = await Usuario.count();*/

    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip(desde)
            .limit(5),
        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    });
}

const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;

   

    try {

        const existeEmail = await Usuario.findOne({email});

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar usuario
        await usuario.save();

        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
        
    }

}

const actualizarUsuario = async(req, res = response) => {  
    const uid = req.params.id;
    
    try {
        
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

      
        //actualizaciones
        const {password, google, email, ...campos} = req.body;
        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({email});
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        campos.email = email;
        
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}

const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'deleteUsuario'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
        
    }
}


module.exports = { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario };