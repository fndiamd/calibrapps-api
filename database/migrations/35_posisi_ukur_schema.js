'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PosisiUkurSchema extends Schema {
  up () {
    this.create('posisi_ukurs', (table) => {
      table.increments('posisi_ukur_id')
      table.string('posisi_ukur_posisi', 100)
      table.integer('data_ukur_id')
        .notNullable()
        .unsigned()
        .references('data_ukur_id')
        .inTable('data_ukurs')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('posisi_ukurs')
  }
}

module.exports = PosisiUkurSchema
