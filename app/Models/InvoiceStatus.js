'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class InvoiceStatus extends Model {
    static get primaryKey(){
        return 'invoice_status_id'
    }

    static get createdAtColumn(){
        return null
    }

    static get updatedAtColumn(){
        return null
    }
    
    invoiceOrder(){
        return this.hasMany('App/Models/InvoiceOrder')
    }
}

module.exports = InvoiceStatus
