'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderDetailSchema extends Schema {
  up() {
    this.create('order_details', (table) => {
      table.increments('order_detail_id')
      table.integer('order_detail_harga')
      table.string('order_detail_keterangan', 100)
      table.integer('progres_order_id')
        .notNullable()
        .unsigned()
        .references('progres_order_id')
        .inTable('progres_orders')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('barang_kalibrasi_id')
        .notNullable()
        .unsigned()
        .references('barang_kalibrasi_id')
        .inTable('barang_kalibrasis')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('order_details')
  }
}

module.exports = OrderDetailSchema
