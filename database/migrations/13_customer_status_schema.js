'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerStatusSchema extends Schema {
  up () {
    this.create('customer_statuses', (table) => {
      table.increments('customer_status_id')
      table.string('customer_status_keterangan', 100).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('customer_statuses')
  }
}

module.exports = CustomerStatusSchema
