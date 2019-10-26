'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MerkBarangSchema extends Schema {
  up () {
    this.create('merk_barangs', (table) => {
      table.increments('merk_barang_id')
      table.string('merk_barang_nama', 100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('merk_barangs')
  }
}

module.exports = MerkBarangSchema
