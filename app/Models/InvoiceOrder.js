'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class InvoiceOrder extends Model {
    static get primaryKey() {
        return 'invoice_order_id'
    }

    static get dates() {
        return super.dates.concat(['invoice_order_tanggal'])
    }

    invoiceStatus() {
        return this.belongsTo('App/Models/InvoiceStatus')
    }

    progresOrder() {
        return this.belongsTo('App/Models/ProgresOrder')
    }
}

module.exports = InvoiceOrder
