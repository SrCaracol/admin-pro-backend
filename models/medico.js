const {Schema, model} = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }    
});

MedicoSchema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();
    return object;
});

module.exports = model('Medico', MedicoSchema);