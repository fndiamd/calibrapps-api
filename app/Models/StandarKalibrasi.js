'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StandarKalibrasi extends Model {
    static get primaryKey(){
        return 'standar_kalibrasi_id'
    }

    list_kalibrasi(){
        return this.hasMany('App/Models/ListKalibrasi')
    }
}

module.exports = StandarKalibrasi
