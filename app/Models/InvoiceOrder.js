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

    static formatDates(field, value) {
        if (field === 'invoice_order_tanggal') {
            return value.format('YYYY-MM-DD')
        }
        return super.formatDates(field, value)
    }

    invoiceStatus() {
        return this.belongsTo('App/Models/InvoiceStatus')
    }

    progresOrder() {
        return this.belongsTo('App/Models/ProgresOrder')
    }
}

module.exports = InvoiceOrder
