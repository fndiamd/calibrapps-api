'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PerusahaanBroker extends Model {
    static get primaryKey(){
        return 'perusahaan_broker_id'
    }

    brokerStatus(){
        return this.belongsTo('App/Models/BrokerStatus')
    }

    transaksiBroker(){
        return this.hasMany('App/Models/TransaksiBroker')
    }
}

module.exports = PerusahaanBroker
