'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TransaksiBroker extends Model {
    static get primaryKey(){
        return 'transaksi_broker_id'
    }

    transaksiBrokerStatus(){
        return this.hasOne('App/Models/TransaksiBrokerStatus')
    }

    barangKalibrasi(){
        return this.hasMany('App/Models/BarangKalibrasi')
    }

    perusahaanBroker(){
        return this.hasOne('App/Models/PerusahaanBroker')
    }
}

module.exports = TransaksiBroker