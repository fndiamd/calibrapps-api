'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TransaksiBroker extends Model {
    static get primaryKey(){
        return 'transaksi_broker_id'
    }

    static get dates(){
        return super.dates.concat(['transaksi_broker_tanggal_penyerahan'])
    }

    transaksiBrokerStatus(){
        return this.belongsTo('App/Models/TransaksiBrokerStatus')
    }

    barangKalibrasi(){
        return this.belongsTo('App/Models/BarangKalibrasi')
    }

    perusahaanBroker(){
        return this.belongsTo('App/Models/PerusahaanBroker')
    }
}

module.exports = TransaksiBroker
