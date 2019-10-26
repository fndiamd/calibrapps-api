'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TransaksiBrokerStatus extends Model {
    static get primaryKey(){
        return 'transaksi_broker_status_id'
    }

    transaksiBroker(){
        return this.hasMany('App/Models/TransaksiBroker')
    }
}

module.exports = TransaksiBrokerStatus
