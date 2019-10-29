'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DataUkur extends Model {
    static get primaryKey(){
        return 'data_ukur_id'
    }

    dataPengamatan(){
        return this.hasMany('App/Models/DataPengamatan')
    }

    barangKalibrasi(){
        return this.hasOne('App/Models/BarangKalibrasi')
    }

    seqDataUkur(){
        return this.hasOne('App/Models/SeqDataUkur')
    }
}

module.exports = DataUkur
