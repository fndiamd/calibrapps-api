'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DataPengamatanSchema extends Schema {
  up() {
    this.create('data_pengamatans', (table) => {
      table.increments('data_pengamatan_id')
      table.date('data_pengamatan_tanggal_kalibrasi')
      table.string('data_pengamatan_tempat_kalibrasi', 100)
      table.string('data_pengamatan_suhu_terkoreksi', 100)
      table.string('data_pengamatan_kelembaban_terkoreksi', 100)
      table.json('data_pengamatan_detail')
      table.integer('barang_kalibrasi_id')
        .notNullable()
        .unsigned()
        .references('barang_kalibrasi_id')
        .inTable('barang_kalibrasis')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('pengamatan_status_id')
        .unsigned()
        .references('pengamatan_status_id')
        .inTable('pengamatan_statuses')
        .onUpdate('CASCADE')
      table.integer('user_cabang_id')
        .notNullable()
        .unsigned()
        .references('user_cabang_id')
        .inTable('user_cabangs')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('data_pengamatans')
  }
}

module.exports = DataPengamatanSchema
