'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ListKalibrasi extends Model {
    static get primaryKey(){
        return 'list_kalibrasi_id'
    }

    ruangLingkup(){
        return this.hasOne('App/Models/RuangLingkup')
    }

    standarKalibrasi(){
        return this.hasOne('App/Models/StandarKalibrasi')
    }

    tipePengerjaan(){
        return this.hasOne('App/Models/TipePengerjaan')
    }
}

module.exports = ListKalibrasi
