'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sertifikat extends Model {
    static get primaryKey(){
        return 'sertifikat_id'
    }

    static get dates(){
        return super.dates.concat(['sertifikat_tanggal_terbit', 'sertifikat_tanggal_berakhir'])
    }

    barangKalibrasi(){
        return this.belongsTo('App/Models/BarangKalibrasi')
    }
}

module.exports = Sertifikat
