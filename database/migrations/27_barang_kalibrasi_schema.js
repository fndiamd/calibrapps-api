'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BarangKalibrasiSchema extends Schema {
  up() {
    this.create('barang_kalibrasis', (table) => {
      table.increments('barang_kalibrasi_id')
      table.string('barang_kalibrasi_kode', 20).notNullable().unique()
      table.string('barang_kalibrasi_sn', 100).notNullable()
      table.string('barang_kalibrasi_tipe', 100)
      table.integer('list_kalibrasi_id')
        .notNullable()
        .unsigned()
        .references('list_kalibrasi_id')
        .inTable('list_kalibrasis')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('barang_status_id')
        .unsigned()
        .references('barang_status_id')
        .inTable('barang_statuses')
        .onUpdate('CASCADE')
      table.integer('merk_barang_id')
        .notNullable()
        .unsigned()
        .references('merk_barang_id')
        .inTable('merk_barangs')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('barang_kalibrasis')
  }
}

module.exports = BarangKalibrasiSchema
