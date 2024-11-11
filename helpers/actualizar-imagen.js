const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const fs = require('fs');
const path = require('path');

const borraImagen = (path) => {
            if (medico.img) {
                // Borrar la imagen anterior
                if (fs.existsSync(pathViejo)) {
                    //borra la imagen anterior
                    fs.unlinkSync(pathViejo);
                }
            }
}
    

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    let pathViejo = '';
    switch(tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No se encontró un médico por id');
                return false;
            }
            pathViejo = `./uploads/medicos/${medico.img}`;
            borraImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;
        break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No se encontró un hospital por id');
                return false;
            }
            pathViejo = `./uploads/hospitales/${hospital.img}`;
            if (hospital.img) {
                // Borrar la imagen anterior
                if (fs.existsSync(pathViejo)) {
                    fs.unlinkSync(pathViejo);
                }
            }
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No se encontró un usuario por id');
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            if (usuario.img) {
                // Borrar la imagen anterior
                if (fs.existsSync(pathViejo)) {
                    fs.unlinkSync(pathViejo);
                }
            }
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        break;
    }
}

module.exports = {
    actualizarImagen
};