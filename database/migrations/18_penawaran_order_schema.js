'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PenawaranOrderSchema extends Schema {
  up() {
    this.create('penawaran_orders', (table) => {
      table.increments('penawaran_order_id')
      table.string('penawaran_order_nomor', 50).notNullable().unique()
      table.string('penawaran_order_perusahaan', 150).notNullable()
      table.date('penawaran_order_tanggal_penawaran')
      table.string('penawaran_order_file', 200)
      table.integer('penawaran_status_id')
        .unsigned()
        .references('penawaran_status_id')
        .inTable('penawaran_statuses')
        .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('penawaran_orders')
  }
}

module.exports = PenawaranOrderSchema
