'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PerusahaanBroker extends Model {
    static get primaryKey(){
        return 'perusahaan_broker_id'
    }

    broker_status(){
        return this.belongsTo('App/Models/BrokerStatus')
    }
}

module.exports = PerusahaanBroker
