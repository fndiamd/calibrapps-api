'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ListKalibrasi extends Model {
    static get primaryKey(){
        return 'list_kalibrasi_id'
    }

    ruangLingkup(){
        return this.belongsTo('App/Models/RuangLingkup')
    }

    standarKalibrasi(){
        return this.belongsTo('App/Models/StandarKalibrasi')
    }

    tipePengerjaan(){
        return this.belongsTo('App/Models/TipePengerjaan')
    }

    barangKalibrasi(){
        return this.hasMany('App/Models/BarangKalibrasi')
    }
}

module.exports = ListKalibrasi
