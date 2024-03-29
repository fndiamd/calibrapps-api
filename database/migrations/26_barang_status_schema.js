'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BarangStatusSchema extends Schema {
  up () {
    this.create('barang_statuses', (table) => {
      table.increments('barang_status_id')
      table.string('barang_status_keterangan', 100).notNullable().unique()
      table.string('barang_status_warna', 50).notNullable().unique()
    })
  }

  down () {
    this.drop('barang_statuses')
  }
}

module.exports = BarangStatusSchema
