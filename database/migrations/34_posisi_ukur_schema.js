'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PosisiUkurSchema extends Schema {
  up () {
    this.create('posisi_ukurs', (table) => {
      table.increments('posisi_ukur_id')
      table.string('posisi_ukur_posisi', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('posisi_ukurs')
  }
}

module.exports = PosisiUkurSchema
