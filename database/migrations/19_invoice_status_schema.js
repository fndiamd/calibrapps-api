'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvoiceStatusSchema extends Schema {
  up () {
    this.create('invoice_statuses', (table) => {
      table.increments('invoice_status_id')
      table.string('invoice_status_keterangan', 100).notNullable().unique()
      table.string('invoice_status_warna', 50).notNullable().unique()
    })
  }

  down () {
    this.drop('invoice_statuses')
  }
}

module.exports = InvoiceStatusSchema
