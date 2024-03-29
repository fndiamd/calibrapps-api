'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderStatusSchema extends Schema {
  up () {
    this.create('order_statuses', (table) => {
      table.increments('order_status_id')
      table.string('order_status_keterangan', 100).notNullable().unique()
      table.string('order_status_warna', 50).notNullable().unique()
    })
  }

  down () {
    this.drop('order_statuses')
  }
}

module.exports = OrderStatusSchema
