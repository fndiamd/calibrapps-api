'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BarangKalibrasiSchema extends Schema {
  up() {
    this.create('barang_kalibrasis', (table) => {
      table.increments('barang_kalibrasi_id')
      table.string('barang_kalibrasi_kode', 20).notNullable().unique()
      table.string('barang_kalibrasi_sn', 100).notNullable()
      table.integer('list_kalibrasi_id')
        .unsigned()
        .references('list_kalibrasi_id')
        .inTable('list_kalibrasis')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('barang_status_id')
        .unsigned()
        .references('barang_status_id')
        .inTable('barang_statuses')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('merk_barang_id')
        .unsigned()
        .references('merk_barang_id')
        .inTable('merk_barangs')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down() {
    this.drop('barang_kalibrasis')
  }
}

module.exports = BarangKalibrasiSchema
