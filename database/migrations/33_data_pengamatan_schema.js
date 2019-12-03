'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DataPengamatanSchema extends Schema {
  up() {
    this.create('data_pengamatans', (table) => {
      table.increments('data_pengamatan_id')
      table.date('data_pengamatan_tanggal_kalibrasi')
      table.string('data_pengamatan_tempat_kalibrasi', 100)
      table.string('data_pengamatan_kondisi_ruangan', 100)
      table.string('data_pengamatan_suhu_terkoreksi', 100)
      table.string('data_pengamatan_kelembaban_terkoreksi', 100)
      table.integer('data_pengamatan_no_id_standar')
      table.integer('data_pengamatan_standar_telusur')
      table.string('data_pengamatan_lebar_pintu', 100)
      table.string('data_pengamatan_letak_sensor', 100)
      table.integer('data_pengamatan_panjang_benda')
      table.integer('data_pengamatan_lebar_benda')
      table.integer('data_pengamatan_tinggi_benda')
      table.integer('data_pengamatan_posisi_1')
      table.integer('data_pengamatan_posisi_1_2')
      table.integer('data_pengamatan_posisi_2_3')
      table.integer('data_pengamatan_posisi_3')
      table.integer('barang_kalibrasi_id')
        .notNullable()
        .unsigned()
        .references('barang_kalibrasi_id')
        .inTable('barang_kalibrasis')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('sensor_id')
        .notNullable()
        .unsigned()
        .references('sensor_id')
        .inTable('sensors')
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
