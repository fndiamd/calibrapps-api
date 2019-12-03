'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DataUkurSchema extends Schema {
  up() {
    this.create('data_ukurs', (table) => {
      table.increments('data_ukur_id')
      table.string('data_ukur_setting_point', 100)
      table.string('data_ukur_lebar_pintu', 100)
      table.string('data_ukur_letak_sensor', 100)
      table.int('data_ukur_panjang_benda')
      table.int('data_ukur_lebar_benda')
      table.int('data_ukur_tinggi_benda')
      table.int('data_ukur_posisi_1')
      table.int('data_ukur_posisi_1_2')
      table.int('data_ukur_posisi_2_3')
      table.int('data_ukur_posisi_3')
      table.integer('data_pengamatan_id')
        .notNullable()
        .unsigned()
        .references('data_pengamatan_id')
        .inTable('data_pengamatans')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('data_ukurs')
  }
}

module.exports = DataUkurSchema
