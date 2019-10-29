'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class InvoiceOrder extends Model {
    static get primaryKey(){
        return 'invoice_order_id'
    }

    invoiceStatus(){
        return this.hasOne('App/Models/InvoiceStatus')
    }

    progresOrder(){
        return this.hasOne('App/Models/ProgresOrder')
    }
}

module.exports = InvoiceOrder
