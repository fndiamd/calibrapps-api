'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProgresOrderSchema extends Schema {
  up () {
    this.create('progres_orders', (table) => {
      table.increments('progres_order_id')
      table.date('progres_order_tanggal_order')
      table.date('progres_order_estimasi')
      table.integer('customer_perusahaan_id').unsigned().references('customer_perusahaan_id').inTable('customer_perusahaans')
      table.integer('kantor_order_id').unsigned().references('kantor_cabang_id').inTable('kantor_cabangs')
      table.integer('order_status_id').unsigned().references('order_status_id').inTable('order_statuses')
      table.timestamps()
    })
  }

  down () {
    this.drop('progres_orders')
  }
}

module.exports = ProgresOrderSchema
