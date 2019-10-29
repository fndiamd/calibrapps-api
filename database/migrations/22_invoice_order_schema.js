'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvoiceOrderSchema extends Schema {
  up () {
    this.create('invoice_orders', (table) => {
      table.increments('invoice_order_id')
      table.date('invoice_order_tanggal')
      table.decimal('invoice_order_total')
      table.integer('progres_order_id').unsigned().references('progres_order_id').inTable('progres_orders')
      table.integer('invoice_status_id').unsigned().references('invoice_status_id').inTable('invoice_statuses')
      table.timestamps()
    })
  }

  down () {
    this.drop('invoice_orders')
  }
}

module.exports = InvoiceOrderSchema
