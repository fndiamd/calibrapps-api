'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DataUkur extends Model {
    static get primaryKey(){
        return 'data_ukur_id'
    }

    dataPengamatan(){
        return this.belongsTo('App/Models/DataPengamatan')
    }

    barangKalibrasi(){
        return this.belongsTo('App/Models/BarangKalibrasi')
    }

    seqDataUkur(){
        return this.hasMany('App/Models/SeqDataUkur')
    }
}

module.exports = DataUkur
