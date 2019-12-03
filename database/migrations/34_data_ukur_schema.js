'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DataUkurSchema extends Schema {
  up() {
    this.create('data_ukurs', (table) => {
      table.increments('data_ukur_id')
      table.string('data_ukur_setting_point', 100)
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
