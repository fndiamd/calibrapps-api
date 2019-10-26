'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OrderStatus extends Model {
    static get primaryKey(){
        return 'order_status_id'
    }

    progresOrder(){
        return this.hasMany('App/Models/ProgresOrder')
    }
}

module.exports = OrderStatus
