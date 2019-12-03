'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransaksiPenawaranSchema extends Schema {
  up() {
    this.create('transaksi_penawarans', (table) => {
      table.integer('penawaran_order_id')
        .notNullable()
        .unsigned()
        .references('penawaran_order_id')
        .inTable('penawaran_orders')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('progres_order_id')
        .notNullable()
        .unsigned()
        .references('progres_order_id')
        .inTable('progres_orders')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('transaksi_penawarans')
  }
}

module.exports = TransaksiPenawaranSchema
