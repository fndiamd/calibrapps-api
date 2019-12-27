'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DataUkurSchema extends Schema {
  up() {
    this.create('data_ukurs', (table) => {
      table.increments('data_ukur_id')
      table.json('data_ukur_data')
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
