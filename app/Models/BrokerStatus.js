'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BrokerStatus extends Model {
    static get primaryKey(){
        return 'broker_status_id'
    }

    perusahaanBroker(){
        return this.hasMany('App/Models/PerusahaanBroker')
    }
}

module.exports = BrokerStatus
