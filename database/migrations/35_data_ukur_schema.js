'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DataUkurSchema extends Schema {
  up() {
    this.create('data_ukurs', (table) => {
      table.increments('data_ukur_id')
      table.string('data_ukur_setting_point', 100)
      table.integer('data_pengamatan_id')
        .unsigned()
        .references('data_pengamatan_id')
        .inTable('data_pengamatans')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
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
    this.drop('data_ukurs')
  }
}

module.exports = DataUkurSchema
