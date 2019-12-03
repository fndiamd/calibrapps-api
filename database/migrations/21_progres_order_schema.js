'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProgresOrderSchema extends Schema {
  up() {
    this.create('progres_orders', (table) => {
      table.increments('progres_order_id')
      table.string('progres_order_nomor', 100).notNullable()
      table.string('progres_order_nomor_onf', 100)
      table.date('progres_order_tanggal_order')
      table.date('progres_order_estimasi')
      table.boolean('progres_order_verif').defaultTo(false)
      table.integer('customer_perusahaan_id')
        .notNullable()
        .unsigned()
        .references('customer_perusahaan_id')
        .inTable('customer_perusahaans')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('kantor_cabang_id')
        .notNullable()
        .unsigned()
        .references('kantor_cabang_id')
        .inTable('kantor_cabangs')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('order_status_id')
        .unsigned()
        .references('order_status_id')
        .inTable('order_statuses')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down() {
    this.drop('progres_orders')
  }
}

module.exports = ProgresOrderSchema
