'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SertifikatSchema extends Schema {
  up() {
    this.create('sertifikats', (table) => {
      table.increments('sertifikat_id')
      table.string('sertifikat_nomor', 100).notNullable().unique()
      table.string('sertifikat_nomor_seri', 100).notNullable().unique()
      table.string('sertifikat_file', 200).notNullable()
      table.string('sertifikat_status', 50)
      table.date('sertifikat_tanggal_terbit')
      table.date('sertifikat_tanggal_berakhir')
      table.integer('barang_kalibrasi_id')
        .unsigned()
        .references('barang_kalibrasi_id')
        .inTable('barang_kalibrasis')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down() {
    this.drop('sertifikats')
  }
}

module.exports = SertifikatSchema
