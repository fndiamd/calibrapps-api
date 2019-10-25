'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TipePengerjaan extends Model {
    static get primaryKey(){
        return 'tipe_pengerjaan_id'
    }

    list_kalibrasi(){
        return this.hasMany('App/Models/ListKalibrasi')
    }
}

module.exports = TipePengerjaan
